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

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const checkUrl = await connection.query(
      `SELECT * FROM urls WHERE "id" = $1;`,
      [id]
    );

    if (checkUrl.rowCount === 0) {
      return res.status(404).send({ message: "Url not found." });
    }
    const urlId = checkUrl.rows[0].id;
    const shortUrl = checkUrl.rows[0].shortUrl;
    const url = checkUrl.rows[0].url;

    return res.status(200).send({ id: urlId, shortUrl, url });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function openUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const checkUrl = await connection.query(
      `SELECT * FROM urls WHERE "shortUrl" = $1;`,
      [shortUrl]
    );

    if (checkUrl.rowCount === 0) {
      return res.status(404).send({ message: "Url not found." });
    }
    const thisUrl = checkUrl.rows[0];

    await connection.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1;`,
      [thisUrl.id]
    );

    return res.redirect(thisUrl.url);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function deleteUrl(req, res) {
  try {
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
