import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER_LOCAL,
    password: process.env.DB_PASSWORD_LOCAL,
    port: process.env.DB_PORT_LOCAL as any,
    database: process.env.DB_NAME_LOCAL,
  },
});
