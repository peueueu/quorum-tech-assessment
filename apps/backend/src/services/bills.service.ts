import fs from "node:fs"
import path from "node:path"
import { parse } from "fast-csv";
import { Bill, BillsSummary, VOTE_TYPE } from "../utils/types";
import { VotesService } from "../services/votes.service";
import { LegislatorsService } from "../services/legislators.service";

export class BillsService {
  private filePath = path.resolve(__dirname, '../data', "bills.csv");
  private votesService: VotesService;
  private legislatorsService: LegislatorsService;

  constructor() {
    this.votesService = new VotesService();
    this.legislatorsService = new LegislatorsService();
  }

  private loadBillsFromCsv() {
    if (!fs.existsSync(this.filePath)) {
      throw new Error('CSV file not found')
    }

    return new Promise<Array<Bill>>((resolve, reject) => {
      const bills: Array<Bill> = [];
      fs.createReadStream(this.filePath)
        .pipe(parse({ headers: true }))
        .on('error', error => reject(error))
        .on('data', (row) => {
          bills.push({
            id: parseInt(row.id),
            title: row.title,
            sponsorId: parseInt(row.sponsor_id)
          })
        })
        .on('end', () => resolve(bills));
    });
  }

  async getBillsSummary() {
    const bills = await this.loadBillsFromCsv();
    const voteResults = await this.votesService.loadVoteResultsFromCsv();
    const grouped = new Map<string, BillsSummary>();

    for (const bill of bills) {
      const billRelatedVote = await this.votesService.getVoteByBillId(bill.id);

      if (!billRelatedVote) {
        return
      }

      const billPrimarySponsor = await this.legislatorsService.getLegislatorById(bill.sponsorId);

      const filteredVoteResults = voteResults.filter((vote) => billRelatedVote.id === vote.voteId);

      const supporters = filteredVoteResults.filter((vote) => vote.voteType === VOTE_TYPE.YEA).length
      const opposers = filteredVoteResults.filter((vote) => vote.voteType === VOTE_TYPE.NAY).length

      grouped.set(bill.id.toString(), {
        id: bill.id,
        title: bill.title,
        supporters: supporters,
        opposers: opposers,
        primarySponsor: billPrimarySponsor?.name || "",
      })
    }


    return Array.from(grouped.values());
  }
}