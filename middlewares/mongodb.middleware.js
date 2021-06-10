import mongoose from 'mongoose';

const connect = async () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log(`Mongo running at ${process.env.MONGO_URI}`))
        .catch(err => console.log(`MongoDB error =========== ${err}`));
}


const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState !== 1) {
        await connect();
    }

    return handler(req, res);
}

const db = mongoose.connection;

db.once('ready', () => console.log(`connected to mongo on ${process.env.MONGO_URI}`))

export default connectDB;