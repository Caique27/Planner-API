import mysql from "mysql2";

const con = mysql.createConnection({
	host: "db4free.net/",
	port: 3306,
	user: "usuariopdb",
	password: "wxvj*Lz4ud5FBC2",
	database: "plannerdatabase",
});

con.connect((err) => {
	if (err) {
		console.log("Error connecting to the database");
		console.log(err);
	} else {
		console.log("Succesfully connected to the database");
	}
});

export default con;
