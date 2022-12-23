import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const connection = mysql.createConnection({uri:process.env.DATABASE_URL, multipleStatements: true});
export default connection.promise();

