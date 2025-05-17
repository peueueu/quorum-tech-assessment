import { Request, Response } from "express";
import { BillsService } from "../services/bills.service";
import { VotesService } from "../services/votes.service";

export class BillsController {
  private billsService: BillsService;
  private votesService: VotesService;
  constructor() {
    this.billsService = new BillsService();
    this.votesService = new VotesService();
  }

  async getAllBills(req: Request, res: Response) {
    try {
      const billsStream = await this.billsService.loadBillsFromCsv();
      const voteResultsStream = await this.votesService.loadVoteResultsFromCsv();
      const votesStream = await this.votesService.loadVotesFromCsv();
      res.setHeader('Content-Type', 'application/json');
      console.log(billsStream)
      res.status(200).json({ bills: billsStream, voteResults: voteResultsStream, votes: votesStream })
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}