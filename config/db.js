import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ashu:nHgJVm2mls9IcF9q@cluster0.kup7l.mongodb.net/food-del')
        .then(() => {
            console.log('MongoDB connected');
        })
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}; 