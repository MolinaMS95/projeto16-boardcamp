import { Router } from "express";
import { getCustomers, findCustomerById } from "../controllers/customers.controllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", findCustomerById)

export default router;