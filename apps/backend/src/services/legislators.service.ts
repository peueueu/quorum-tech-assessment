import fs from "node:fs"
import path from "node:path"
import { parse } from "fast-csv";
import { Legislator, LegislatorSummary, VOTE_TYPE } from "../utils/types";
import { VotesService } from "../services/votes.service";

export class LegislatorsService {
  private filePath = path.resolve(__dirname, '../data', "legislators.csv")
  private votesService: VotesService;

  constructor() {
    this.votesService = new VotesService();
  }

  private loadLegislatorsFromCsv() {
    if (!fs.existsSync(this.filePath)) {
      throw new Error('CSV file not found')
    }

    return new Promise<Array<Legislator>>((resolve, reject) => {
      const legislators: Array<Legislator> = [];

      fs.createReadStream(this.filePath)
        .pipe(parse({ headers: true }))
        .on('error', error => reject(error))
        .on('data', (row) => legislators.push({
          id: parseInt(row.id),
          name: row.name
        }))
        .on('end', () => resolve(legislators));
    });
  }

  async getLegislatorsSummary() {
    const legislators = await this.loadLegislatorsFromCsv();
    const voteResults = await this.votesService.loadVoteResultsFromCsv();

    const grouped = new Map<string, LegislatorSummary>();

    for (const legislator of legislators) {
      const relatedVotes = voteResults.filter((vote) => vote.legislatorId === legislator.id);
      console.log(relatedVotes)
      const supportingVotesCounter = relatedVotes.filter((vote) => {
        console.log(vote.voteType)
        return vote.voteType === 1
      }).length;
      const opposingVotesCounter = relatedVotes.filter((vote) => {
        console.log(vote.voteType)
        return vote.voteType === 2
      }).length;

      grouped.set(legislator.id.toString(), {
        id: legislator.id,
        name: legislator.name,
        supportedBills: supportingVotesCounter,
        opposedBills: opposingVotesCounter,
      })
    }

    return Array.from(grouped.values());
  }
}