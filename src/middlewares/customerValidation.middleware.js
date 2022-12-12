import { connectionDB } from "../database/db.js";
import { customerSchema } from "../models/customer.model.js";

export async function customerValidation(req, res, next) {
  const customer = req.body;
  const { id } = req.params;

  const { error } = customerSchema.validate(customer, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM customers WHERE cpf = $1 AND id <> $2;",
      [customer.cpf, id]
    );

    if (rows.length !== 0) {
      return res.sendStatus(409);
    }

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
