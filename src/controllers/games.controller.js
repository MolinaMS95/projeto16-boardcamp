import { connectionDB } from "../database/db.js";

export async function getGames(req, res) {
  const name = req.query.name;
  try {
    const { rows } = await connectionDB.query(
      `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;`
    );
    if (!name) {
      return res.send(rows);
    } else {
      const filteredRows = rows.filter((game) =>
        game.name.toLowerCase().startsWith(name.toLowerCase())
      );
      return res.send(filteredRows);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connectionDB.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
