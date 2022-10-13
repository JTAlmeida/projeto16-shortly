import connection from "../database/db.js";

export default async function tokenValidations(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "Invalid token." });
  }

  try {
    const sessions = await connection.query(
      `SELECT * FROM sessions WHERE token = $1;`,
      [token]
    );

    const session = sessions.rows[0];
    if (!session) {
      return res.status(401).send({ message: "Invalid session." });
    }

    const users = await connection.query(`SELECT * FROM users WHERE id = $1;`, [
      session.userId,
    ]);
    const user = users.rows[0];
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
