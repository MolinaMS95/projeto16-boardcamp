import { Router } from "express";
import { customerValidation } from "../middlewares/customerValidation.middleware.js";
import {
  getCustomers,
  findCustomerById,
  createCustomer,
  updateCustomer,
} from "../controllers/customers.controllers.js";

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", findCustomerById);
router.post("/customers", customerValidation, createCustomer);
router.put("/customers/:id", customerValidation, updateCustomer);

export default router;
