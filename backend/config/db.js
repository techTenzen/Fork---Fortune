import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://bashar:1234@cluster0.u4bby57.mongodb.net/food-delivery'
    )
    .then(() => {
      console.log('DB Connected');
    });
};
