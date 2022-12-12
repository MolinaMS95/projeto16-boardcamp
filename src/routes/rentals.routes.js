import { Router } from "express";
import { rentalValidation } from "../middlewares/rentalValidation.middleware.js";
import { getRentals, createRental } from "../controllers/rentals.controller.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalValidation, createRental);

export default router;
