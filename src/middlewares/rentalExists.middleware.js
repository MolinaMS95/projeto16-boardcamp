import { connectionDB } from "../database/db.js";

export async function rentalExists(req, res, next) {
  const { id } = req.params;

  try {
    const rental = await connectionDB.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    ).rows;

    if (rental.length === 0) {
      return res.sendStatus(404);
    }

    if (rental[0].returnDate !== null) {
      return res.sendStatus(400);
    }

    res.locals.rental = rental[0]; 

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
