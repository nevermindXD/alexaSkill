import mongoose from 'mongoose';


export const mongooseConnection = (URI) => {
    mongoose.Promise = global.Promise;
    mongoose.connection.openUri(URI)
        .then(() => {
            console.log(`Connected to db: ${URI} successfully via MONGOOSE`);
        }).catch (err => {
            console.log(`MongoDB connection error. Please make sure MongoDB is running. Error: ${err}`);
            process.exit(1);
        })
};