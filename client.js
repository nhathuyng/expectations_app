const { Client } = require('pg');

const pgclient = new Client({
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	user: 'huy',
	password: 'password',
	database: 'data_quality',
});

pgclient.connect();

const schema = 'CREATE SCHEMA app';

const table =
	'CREATE TABLE app.customer (id SERIAL PRIMARY KEY, firstName VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL, age INT, address VARCHAR(80), email VARCHAR(40))';
const text = 'INSERT INTO app.customer(firstname, lastname, age, address, email) VALUES($1, $2, $3, $4, $5) RETURNING *';
const values = ['Mona the', 'Octocat', 9, '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States', 'octocat@github.com'];

pgclient.query(schema, (err, res) => {
	if (err) throw err;
});

pgclient.query(table, (err, res) => {
	if (err) throw err;
});

pgclient.query(text, values, (err, res) => {
	if (err) throw err;
});

pgclient.query('SELECT * FROM app.customer', (err, res) => {
	if (err) throw err;
	console.log(err, res.rows); // Print the data in student table
	pgclient.end();
});
