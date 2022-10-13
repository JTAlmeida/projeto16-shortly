import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

let connection;
try {
  connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} catch (error) {
  console.error(`Error "${error}" while trying to connect to database.`);
}

export default connection;
