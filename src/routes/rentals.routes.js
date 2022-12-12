import { Router } from "express";
import { rentalValidation } from "../middlewares/rentalValidation.middleware.js";
import { rentalExists } from "../middlewares/rentalExists.middleware.js";
import { isRentalFinished } from "../middlewares/isRentalFinished.middleware.js";
import {
  getRentals,
  createRental,
  returnRental,
  deleteRental,
} from "../controllers/rentals.controller.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalValidation, createRental);
router.post("/rentals/:id/return", rentalExists, returnRental);
router.delete("/rentals/:id", isRentalFinished, deleteRental);

export default router;
