import { connectionDB } from "../database/db.js";
import { categorySchema } from "../models/category.model.js";

export async function categoryValidation(req, res, next) {
  const category = req.body;

  const { error } = categorySchema.validate(category, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM categories WHERE name=$1;",
      [category.name]
    );

    if (rows.length !== 0) {
      return res.sendStatus(409);
    }

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
