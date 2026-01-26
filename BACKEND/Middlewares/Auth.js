const jwt = require('jsonwebtoken');
const isAuthorised = (req,res,next) =>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message: "Unauthorised. JWT Token required."});
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(403).json({message: "JWT token expired or Invalid JWT Token"});
    }
}

module.exports = isAuthorised;