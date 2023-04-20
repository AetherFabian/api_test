const sql = require('mssql');
const config = require('./config');

module.exports = async (query) => {
  let response = null;
  const pool = new sql.ConnectionPool(config.databases[0]);
  pool.on('error', err => {
    console.log(err);
  })
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    response = {
      success: result
    };
  } catch (err) {
    response = err;
    console.log(err)
  } finally {
    await pool.close();
  }
  if (response instanceof Error) {
    throw response;
  }
  return response;
}