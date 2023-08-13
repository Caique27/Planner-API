import mysql from "mysql";

const con = mysql.createConnection({
	host: "localhost",
	port: 3030,
	user: "root",
	password: "senha",
	database: "planner_database",
});

con.connect((err) => {
	if (err) {
		console.log("Error connecting to the database");
	} else {
		console.log("Succesfully connected to the database");
	}
});

export default con;
