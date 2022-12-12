import { Router } from "express";
import { categoryValidation } from "../middlewares/categoryValidation.middleware.js";
import {
  getCategories,
  createCategory,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", categoryValidation, createCategory);

export default router;
