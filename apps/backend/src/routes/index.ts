import { Router } from "express";
import { format } from "fast-csv";
import { BillsController } from "../controllers/bills.controller";
import { LegislatorsController } from "../controllers/legislators.controller.ts";

const router = Router();


router.get('/bills', (req, res) => new BillsController().getAllBills(req, res));

router.get('/legislators', (req, res) => new LegislatorsController().getLegislators(req, res));



export default router