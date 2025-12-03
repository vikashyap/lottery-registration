import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle(pool);

async function addBirthdayItemsColumn() {
  try {
    await pool.query(`
      ALTER TABLE prices 
      ADD COLUMN IF NOT EXISTS birthday_items jsonb;
    `);
    console.log('✅ Successfully added birthday_items column to prices table');
  } catch (error) {
    console.error('Error adding column:', error);
  } finally {
    await pool.end();
  }
}

addBirthdayItemsColumn();
