import mongoose from 'mongoose';
import { CONFIG } from '../utils/Constants.js';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

const mongoConnect = async () => {
    try {
        const conn = await mongoose.connect(CONFIG.URL_MONGO);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1); //1 code means exit with failure, 0 means success
    }
};

const mongoDisconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDb disconnected');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export { mongoConnect, mongoDisconnect };
