import { connectionDB } from "../database/db.js";
import { gameSchema } from "../models/game.model.js";

export async function gameValidation(req, res, next) {
  const game = req.body;

  const { error } = gameSchema.validate(game, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM categories WHERE id=$1;",
      [game.categoryId]
    );

    if (rows.length === 0) {
      return res.sendStatus(400);
    }

    const games = await connectionDB.query(
      "SELECT * FROM games WHERE name=$1;",
      [game.name]
    );

    if (games.rows.length !== 0) {
      return res.sendStatus(409);
    }

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
