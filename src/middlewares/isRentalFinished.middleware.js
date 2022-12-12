import { connectionDB } from "../database/db.js";

export async function isRentalFinished(req, res, next) {
  const { id } = req.params;

  try {
    const rental = await connectionDB.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );

    if (rental.rows.length === 0) {
      return res.sendStatus(404);
    }

    if (rental.rows[0].returnDate == null) {
      return res.sendStatus(400);
    }

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
