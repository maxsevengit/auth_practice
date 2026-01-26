const express = require('express');
const isAuthorised = require('../Middlewares/Auth');
const router = express.Router();

router.get('/', isAuthorised,(req,res)=>{
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },{
            name:"Laptop",
            price:200000
        }
    ])
})


module.exports = router