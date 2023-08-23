import mysql from "mysql2";

const con = mysql.createConnection({
	host: "containers-us-west-103.railway.app",
	port: 6726,
	user: "root",
	password: "rLhj29ppd0MAjJtQ8dXn",
	database: "railway",
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
