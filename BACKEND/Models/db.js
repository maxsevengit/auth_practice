const mongoose = require('mongoose')
const mongo_url = process.env.MONGO_CONN;

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("Database connected successfully!");
    }).catch((err)=>{
        console.log("Database connection error: ", err);
    })