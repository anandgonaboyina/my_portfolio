import mysql from "mysql2/promise";
const globalForMysql = global as unknown as { pool: mysql.Pool };

export const pool = globalForMysql.pool || mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
)

if (process.env.Node_ENV !== "production") globalForMysql.pool = pool;
