import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL || '',
  nodeDev : process.env.NODE_DEV || 'production',
  jwtSecret: process.env.JWT_ACCESS_SECRET || '',
  jwtExpires : process.env.JWT_ACCESS_EXPIRES || '',
  bcryptSalt : process.env.BCRYPT_SALT_ROUND || '',
  superAdminPhone : process.env.SUPER_ADMIN_PHONE || '',
  superAdminPassword : process.env.SUPER_ADMIN_PASSWORD || '',
};
