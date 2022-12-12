import { Router } from "express";
import { customerValidation } from "../middlewares/customerValidation.middleware.js";
import {
  getCustomers,
  findCustomerById,
  createCustomer,
} from "../controllers/customers.controllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", findCustomerById);
router.post("/customers", customerValidation, createCustomer);

export default router;
