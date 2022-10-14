import connection from "../database/db.js";

export async function getUserInfo(req, res) {
  const { user } = res.locals;

  try {
    const userUrls = await connection.query(
      `SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1 ORDER BY id;`,
      [user.id]
    );

    const visits = await connection.query(
      `SELECT SUM(urls."visitCount")::int AS "visitCount" FROM urls WHERE urls."userId" = $1;`,
      [user.id]
    );

    return res.status(200).send({
      id: user.id,
      name: user.name,
      visitCount: visits.rows[0].visitCount,
      shortenedUrls: userUrls.rows,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = await connection.query(
      `SELECT users.id, users.name, 
      COUNT(urls.id)::int AS "linksCount", 
      COALESCE(SUM(urls."visitCount"),0)::int AS "visitCount"
      FROM users 
      LEFT JOIN urls ON users.id = urls."userId"
      GROUP BY users.id
      ORDER BY "visitCount" DESC, "linksCount" DESC LIMIT 10
      ;`
    );

    return res.status(200).send(ranking.rows);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}
