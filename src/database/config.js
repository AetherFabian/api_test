require('dotenv').config()
const {
  DATABASEUSERNAME,
  DATABASEPASSWORD,
  DATABASEPORT,
  DATABASENAME,
  HOSTNAME,
} = process.env;

module.exports = {
  "databases": [
    {
      "name": "development",
      "server": HOSTNAME,
      "port": parseInt(DATABASEPORT),
      "database": DATABASENAME,
      "user": DATABASEUSERNAME,
      "password": DATABASEPASSWORD,
      "options": {
        "trustServerCertificate": true,
      }
    }
  ]
}