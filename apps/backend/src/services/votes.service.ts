import fs from "node:fs"
import path from "node:path"
import { parse } from "fast-csv";
import { Vote, VOTE_TYPE, VoteResults } from "../utils/types";

export class VotesService {
  private votesCsvFilePath = path.resolve(__dirname, '../data', "votes.csv")
  private voteResultsCsvFilePath = path.resolve(__dirname, '../data', "vote_results.csv")

  loadVotesFromCsv() {
    if (!fs.existsSync(this.votesCsvFilePath)) {
      throw new Error('CSV file not found')
    }

    return new Promise<Array<Vote>>((resolve, reject) => {
      const votes: Array<Vote> = [];
      fs.createReadStream(this.votesCsvFilePath)
        .pipe(parse({ headers: true }))
        .on('error', error => reject(error))
        .on('data', (row) => {
          votes.push({
            id: parseInt(row.id),
            billId: parseInt(row.bill_id)
          })
        })
        .on('end', () => resolve(votes));
    });
  }

  loadVoteResultsFromCsv() {
    if (!fs.existsSync(this.voteResultsCsvFilePath)) {
      throw new Error('CSV file not found')
    }

    return new Promise<Array<VoteResults>>((resolve, reject) => {
      const votes: Array<VoteResults> = [];
      fs.createReadStream(this.voteResultsCsvFilePath)
        .pipe(parse({ headers: true }))
        .on('error', error => reject(error))
        .on('data', (row) => {
          votes.push({
            id: parseInt(row.id),
            legislatorId: parseInt(row.legislator_id),
            voteType: parseInt(row.vote_type) === VOTE_TYPE.YEA ? VOTE_TYPE.YEA : VOTE_TYPE.NAY,
            voteId: parseInt(row.vote_id)
          })
        })
        .on('end', () => resolve(votes));
    });
  }

  async getVoteByBillId(billId: number) {
    const votes = await this.loadVotesFromCsv();
    return votes.find((vote) => vote.billId === billId);
  }
}