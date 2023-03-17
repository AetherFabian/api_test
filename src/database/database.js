const sql = require('mssql');
const config = require('./config');

module.exports = async (query) => {
  let result = null;
  const pool = new sql.ConnectionPool(config.databases[0]);
  pool.on('error', err => {
    console.log(err);
  })
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    result = {
      success: result
    };
  } catch (err) {
    result = err;
    console.log(err)
  } finally {
    await pool.close();
  }
  if (result instanceof Error) {
    throw result;
  }
  return result;
}