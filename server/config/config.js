module.exports = {
  "development": {
    "username": process.env.DATABASE_USER || "root",
    "password": process.env.DATABASE_PASSWORD,
    "database": "balaan",
    "host": process.env.DATABASE_HOST || "127.0.0.1",
    "port":3306,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT || 3306,
    "dialect": "mysql",
    "dialectOptions": {
      ssl:'Amazon RDS'
    },
  }
}
