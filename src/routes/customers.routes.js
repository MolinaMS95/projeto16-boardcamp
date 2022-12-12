import { Router } from "express";
import { getCustomers } from "../controllers/customers.controller.js";

const router = Router();

router.get("/customers", getCustomers);

export default router;