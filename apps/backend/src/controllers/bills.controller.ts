import { Request, Response } from "express";
import { BillsService } from "../services/bills.service";

export class BillsController {
  private billsService: BillsService;
  constructor() {
    this.billsService = new BillsService();
  }

  async getAllBills(_: Request, res: Response) {
    try {
      const billsStream = await this.billsService.getBillsSummary();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(billsStream)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}