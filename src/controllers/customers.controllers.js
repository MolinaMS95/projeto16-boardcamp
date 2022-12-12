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

export async function findCustomerById(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1;",
      [id]
    );

    if (rows.length === 0) {
      return res.sendStatus(404);
    }

    return res.send(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
