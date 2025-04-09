require('dotenv').config();
const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next) =>{
    const header = req.headers['authorization'];
    const bearerToken = header && header.split(" ")[1]
    if(!bearerToken) {
        return res.status(401).json({
            success: false,
            message: 'Please provice access token'
        })
    }
    //decode token
    try{
        const decodedToken = jwt.verify(bearerToken,process.env.SECRET_KEY);
        console.log(decodedToken,'decodedToken')

        req.userInfo = decodedToken;
        next()
    }
    catch(error){
        console.log(error)
    }
    
}
module.exports = authMiddleware;