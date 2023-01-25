const http = require('http');
const port = 3000;

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'CS348Project',
  database: 'Project'
});
connection.connect();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

connection.query('SELECT * from Table1', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.end();

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
