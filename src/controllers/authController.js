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
    const checkUser = await connection.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    );

    if (checkUser.rowCount === 0) {
      return res.status(401).send({ message: "Invalid user or password." });
    }

    const user = checkUser.rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: "Invalid user or password." });
    }

    await connection.query(`DELETE FROM "sessions" WHERE "userId" = $1;`, [
      user.id,
    ]);

    const token = uuid();
    await connection.query(
      `INSERT INTO "sessions" (token, "userId") VALUES ($1, $2);`,
      [token, user.id]
    );

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
