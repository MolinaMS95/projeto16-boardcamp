import { connectionDB } from "../database/db.js";
import { rentalSchema } from "../models/rental.model.js";

export async function rentalValidation(req, res, next) {
  const rental = req.body;

  const { error } = rentalSchema.validate(rental, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const customerRows = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1;",
      [rental.customerId]
    );
    
    if (customerRows.rows.length === 0) {
      return res.sendStatus(400);
    }

    const gamesRows = await connectionDB.query(
      "SELECT * FROM games WHERE id=$1;",
      [rental.gameId]
    );

    if (gamesRows.rows.length == 0) {
      return res.sendStatus(400);
    }

    const rentalsNumber = await connectionDB.query(
      `SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`,
      [rental.gameId]
    );

    if (rentalsNumber.rows.length >= gamesRows.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    res.locals.game = gamesRows.rows[0]; 

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
