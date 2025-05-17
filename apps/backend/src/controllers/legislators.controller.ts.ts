import { Request, Response } from "express";
import { LegislatorsService } from "../services/legislators.service";

export class LegislatorsController {
  private legislatorsService: LegislatorsService;
  constructor() {
    this.legislatorsService = new LegislatorsService();
  }

  async getLegislators(req: Request, res: Response) {
    try {
      const legislatorsStream = await this.legislatorsService.getLegislatorsSummary();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(legislatorsStream)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}