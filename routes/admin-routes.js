const express = require('express');
const authMiddleware = require('../middleware/auth-middleware')
const roleMiddleware = require('../middleware/role-middleware')
const router = express.Router();

router.get('/welcome',authMiddleware,roleMiddleware,(req,res)=>{
    const {username,userId,role} = req.userInfo;
    res.json({
        message:'€WELCOME to Admin',
        user:{
            _id:userId,
            username,
            role
        }
    })
})
module.exports = router;