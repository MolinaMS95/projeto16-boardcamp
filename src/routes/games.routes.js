import { Router } from "express";
import { gameValidation } from "../middlewares/gameValidation.middleware.js";
import { getGames, createGame } from "../controllers/games.controller.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", gameValidation, createGame);

export default router;
