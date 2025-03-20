import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function initializeDatabase() {
  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    await pool.query(schema);
    console.log('Database schema created successfully');

    // Insert some initial loan types
    const loanTypes = [
      {
        name: 'Personal Loan',
        description: 'General purpose personal loan',
        interest_rate: 12.00,
        term_months: 12
      },
      {
        name: 'Business Loan',
        description: 'Small business financing',
        interest_rate: 15.00,
        term_months: 24
      },
      {
        name: 'Emergency Loan',
        description: 'Quick access emergency funding',
        interest_rate: 18.00,
        term_months: 6
      }
    ];

    for (const loanType of loanTypes) {
      await pool.query(
        'INSERT INTO loan_types (name, description, interest_rate, term_months) VALUES ($1, $2, $3, $4)',
        [loanType.name, loanType.description, loanType.interest_rate, loanType.term_months]
      );
    }
    console.log('Initial loan types inserted successfully');

    // Create a default admin user
    const hashedPassword = '$2a$10$YourHashedPasswordHere'; // You should use bcrypt to hash the password
    await pool.query(
      'INSERT INTO users (username, password_hash, email, role) VALUES ($1, $2, $3, $4)',
      ['admin', hashedPassword, 'admin@example.com', 'admin']
    );
    console.log('Default admin user created successfully');

  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

initializeDatabase(); 