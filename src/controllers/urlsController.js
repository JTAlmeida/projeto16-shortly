import connection from "../database/db.js";
import { nanoid } from "nanoid";

export async function urlShortener(req, res) {
  const { user } = res.locals;
  const { url } = req.body;
  const shortenedUrl = nanoid(8);

  try {
    await connection.query(
      `INSERT INTO urls("url", "shortUrl", "userId") VALUES ($1, $2, $3);`,
      [url, shortenedUrl, user.id]
    );

    return res.status(201).send({ shortenedUrl });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
