import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  noswDev : process.env.NODE_DEV || 'production'
};
