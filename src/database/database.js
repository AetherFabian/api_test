const config = require('./config');

module.exports = async (query) => {
  const pool = new sql.ConnectionPool(config.databases[0])
  pool.on('error', err => {
    console.log(err)
  })
  try {
    await pool.connect()
    const result = await pool.request().query(query)
    return {
      success: result
    }
  } catch (err) {
    console.log(err)
  } finally {
    await pool.close()
  }
}