import fs from "node:fs"
import path from "node:path"
import { parse } from "fast-csv";
import { Bill } from "../utils/types";
import { VotesService } from "../services/votes.service";

export class BillsService {
  private filePath = path.resolve(__dirname, '../data', "bills.csv");
  private votesService: VotesService;

  constructor() {
    this.votesService = new VotesService();
  }

  loadBillsFromCsv() {
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
}