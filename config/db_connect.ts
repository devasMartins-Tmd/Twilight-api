import mongoose from 'mongoose';
import color from 'colors';
import { uri } from './uri';

export const connectToDB = async () => {
   try {
      mongoose.set('strictQuery', true);
      const conn = await mongoose.connect(process.env.MONGOURI || uri);
      console.log(color.cyan(`Connected to mongoDB: ${conn.connection.host}`));
   } catch (e) {
      console.log(color.cyan(`Error connecting to mongoDB`));
      process.exit(1);
   }
};
