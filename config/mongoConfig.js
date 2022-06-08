const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI) //makes the request
        await mongoose.connection                //this checks if we have a conection
        console.log('MongoDB Connected!');
    } catch (error) {
        console.log(error);
    }
}