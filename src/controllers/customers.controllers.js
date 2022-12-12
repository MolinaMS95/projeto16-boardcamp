import { connectionDB } from "../database/db.js";

export async function getCustomers(req, res) {
  const cpf = req.query.cpf;

  try {
    const { rows } = await connectionDB.query("SELECT * FROM customers;");
    if (!cpf) {
      return res.send(rows);
    } else {
      const filteredRows = rows.filter((customer) =>
        customer.cpf.startsWith(cpf)
      );
      return res.send(filteredRows);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
