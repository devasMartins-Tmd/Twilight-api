import mongoose from 'mongoose';
import color from 'colors';
import { uri } from './uri';
import { configDotenv } from 'dotenv';
configDotenv({ path: './config/.env' });

export const connectToDB = async () => {
   console.log(process.env.MONGOURI, uri);
   try {
      mongoose.set('strictQuery', true);
      const conn = await mongoose.connect(uri);
      console.log(color.cyan(`Connected to mongoDB: ${conn.connection.host}`));
   } catch (e) {
      console.log(color.cyan(`Error connecting to mongoDB`));
      process.exit(1);
   }
};
