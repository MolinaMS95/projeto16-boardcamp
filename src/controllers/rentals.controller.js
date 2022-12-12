import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const customerId = parseInt(req.query.customerId);
  const gameId = parseInt(req.query.gameId);

  try {
    let { rows } = await connectionDB.query(
      `SELECT rentals.*, customers.id AS "idCustomer", customers.name AS "nameCustomer", games.id AS "idGame", games.name AS "gameName", 
              games."categoryId", categories.name AS "categoryName"
      FROM rentals 
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
      JOIN categories ON games."categoryId" = categories.id;`
    );

    rows = rows.map((rental) => ({
      id: rental.id,
      customerId: rental.customerId,
      gameId: rental.gameId,
      rentDate: rental.rentDate,
      daysRented: rental.daysRented,
      returnDate: rental.returnDate,
      originalPrice: rental.originalPrice,
      delayFee: rental.delayFee,
      customer: { id: rental.idCustomer, name: rental.nameCustomer },
      game: {
        id: rental.idGame,
        name: rental.gameName,
        categoryId: rental.categoryId,
        categoryName: rental.categoryName,
      },
    }));

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

export async function createRental(req, res) {
  const game = res.locals.game;
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format("YYYY-MM-DD");
  const returnDate = null;
  const originalPrice = daysRented * game.pricePerDay;
  const delayFee = null;

  try {
    await connectionDB.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function returnRental(req, res) {
  const rental = res.locals.rental;
  const id = rental.id;
  const price = rental.originalPrice / rental.daysRented;
  const returnDate = dayjs().format("YYYY-MM-DD");
  let delayFee = null;
  const expectedReturnDate = dayjs(rental.rentDate).add(rental.daysRented, "day");
  const delay = dayjs(returnDate).diff(expectedReturnDate, 'day');

  if (delay > 0) {
    delayFee = delay * price;
  }

  try {
    await connectionDB.query(
      `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,
      [returnDate, delayFee, id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    await connectionDB.query("DELETE FROM rentals WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
