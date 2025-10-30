import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('Missing required environment variable DATABASE_URL');
}

export const db = drizzle(databaseUrl);
