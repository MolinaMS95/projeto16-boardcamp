import { connectionDB } from "../database/db.js";

export async function getRentals(req, res) {
  const customerId = parseInt(req.query.customerId);
  const gameId = parseInt(req.query.gameId);

  try {
    const { rows } = await connectionDB.query(
      `SELECT rentals.*, 
              JSON_BUILD_OBJECT("customer", ROW(customers.id, customer.name)), 
              JSON_BUILD_OBJECT("game", ROW(games.id, games.name, games."categoryId", categories.name AS "categoryName"))
      FROM rentals 
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
      JOIN categories ON games."categoryId" = categories.id;`
    );

    if (customerId) {
      rows = rows.filter((rental) => rental.customerId == customerId);
    }

    if (gameId) {
      rows = rows.filter((rental) => rental.gameId == gameId);
    }

    res.send(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
