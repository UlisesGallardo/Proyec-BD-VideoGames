import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
//const connection = mysql.createConnection('mysql://87crf9p9jb2fe8hal4vs:pscale_pw_poeYkQ1v3kY4UCPEDyKeUwy2xXKtxasKwhIQXvQ79wN@us-east.connect.psdb.cloud/videogames?ssl={"rejectUnauthorized":true}');
const connection = mysql.createConnection({uri:process.env.DATABASE_URL, multipleStatements: true});
export default connection.promise();

