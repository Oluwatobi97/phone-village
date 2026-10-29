import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_5m1kYoWIZhfg@ep-sparkling-mud-b56gwmsi-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

export default {
  schema: '/app/applet/frontend/src/db/schema.ts',
  out: '/app/applet/frontend/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config;
