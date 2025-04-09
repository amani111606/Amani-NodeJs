
const roleMiddleware = (req,res,next) =>{
    if(req.userInfo.role !== 'admin') {
        return res.status(401).json({
            success: false,
            message: 'Access denied'
        })
    }
    next();
}
module.exports = roleMiddleware;