require('dotenv').config();
const mongoose = require('mongoose')

const connectToDb = async() => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log('connected to DB');
        
    } catch (error) {
        console.log('connection error -->',error)
        process.exit(1)
    }
}

module.exports = connectToDb;