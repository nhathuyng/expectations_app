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

const table = 'CREATE TABLE app.customer (customer_id VARCHAR(10), order_id VARCHAR(10), email VARCHAR(40), address VARCHAR(80))';
const text = 'INSERT INTO app.customer(customer_id, order_id, email, address) VALUES($1, $2, $3, $4) RETURNING *';
const values = ['1', '1', 'khan@gmail.com', '88 Colin P Kelly Jr St, San Francisco, CA 94107, United States'];

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
