const { Client } = require('pg');

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: 'sdc_1',
});
async function connect(client_) {
  await client_.connect();
}
connect(client);
function closeConnect() {
  client.end();
}
module.exports = client;
module.exports.closeConnect = closeConnect;
