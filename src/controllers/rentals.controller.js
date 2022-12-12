import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

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

export async function createGame(req, res) {
  const game = res.locals.game
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format('YYYY-MM-DD');
  const returnDate = null;
  const originalPrice = daysRented * game.pricePerDay;
  const delayFee = null;

  try {
    await connectionDB.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}