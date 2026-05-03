const { Pool } = require("pg");

const pool = new Pool({
    connectionString:
        "postgresql://postgres:Srithasen@123@db.aovjfdygivecjlubhvmh.supabase.co:5432/postgres",
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;