import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./database/db.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.get("/users", async (req, res) => {
  try {
    const users = await connection.query(
        `SELECT * FROM users;`
    );

    console.log("deu baum");
    res.send(users.rows).status(200);

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
