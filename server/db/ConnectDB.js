const mysql = require('mysql2/promise');
require('dotenv').config();

// Debug: Cetak variabel lingkungan
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[HIDDEN]' : 'undefined');
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_WAITFORCONNECTIONS:', process.env.DB_WAITFORCONNECTIONS);
console.log('DB_CONNECTIONLIMIT:', process.env.DB_CONNECTIONLIMIT);
console.log('DB_QUEUELIMIT:', process.env.DB_QUEUELIMIT);
console.log('DB_TABLENAME:', process.env.DB_TABLENAME);

const ConnectDB = async () => {
  try {
    console.log('Starting database connection...');

    // Validasi kredensial
    if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
      throw new Error('DB_USER or DB_PASSWORD is not defined in .env');
    }

    // Buat koneksi sementara tanpa database untuk membuat database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    console.log('Initial connection created.');

    // Buat database jika belum ada
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``);
    console.log(`Database ${process.env.DB_DATABASE} created or already exists.`);

    // Tutup koneksi sementara
    await connection.end();

    // Buat connection pool dengan database yang sudah ada
    const pool = await mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      waitForConnections: process.env.DB_WAITFORCONNECTIONS === 'true',
      connectionLimit: parseInt(process.env.DB_CONNECTIONLIMIT, 10),
      queueLimit: parseInt(process.env.DB_QUEUELIMIT, 10)
    });
    console.log('Connection pool created.');

    // Gunakan database
    await pool.query(`USE \`${process.env.DB_DATABASE}\``);
    console.log(`Switched to database ${process.env.DB_DATABASE}`);

    // Buat tabel jika belum ada
    await pool.query(`CREATE TABLE IF NOT EXISTS \`${process.env.DB_TABLENAME}\` (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log(`${process.env.DB_TABLENAME} table created or already exists.`);

    return pool;
  } catch (error) {
    console.error('Error in ConnectDB:', error.message);
    throw error;
  }
};

// Jalankan untuk testing
ConnectDB()
  .then(() => console.log('Database setup completed successfully.'))
  .catch(err => console.error('Failed to setup database:', err.message));

module.exports = ConnectDB;