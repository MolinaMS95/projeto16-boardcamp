import { connectionDB } from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM categories;");
    res.send(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function createCategory(req, res) {
  const category = req.body;

  try {
    await connectionDB.query("INSERT INTO categories (name) VALUES ($1);", [
      category.name,
    ]);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
