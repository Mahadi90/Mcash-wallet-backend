import mongoose from 'mongoose';
import app from './app';
import { envConfig } from './app/config/env';

async function main() {
  try {
    await mongoose.connect(envConfig.dbUrl);
    console.log('Connect to DB');

    app.listen(envConfig.port, () => {
      console.log(`Server is running at ${envConfig.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to DB', err);
  }
}

main();
