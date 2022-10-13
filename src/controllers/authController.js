import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import connection from "../database/db.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const checkEmail = await connection.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );

    if (checkEmail.rowCount > 0) {
      return res.status(409).send({ message: "Email is already being used." });
    }

    const passHash = bcrypt.hashSync(password, 10);

    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [name, email, passHash]
    );

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
    
  try {
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
