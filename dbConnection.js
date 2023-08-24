import mysql from "mysql2";

const con = mysql.createConnection({
	host: "sql10.freesqldatabase.com",
	port: 3306,
	user: "sql10641973",
	password: "m6FrRFH3Fi",
	database: "sql10641973",
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
