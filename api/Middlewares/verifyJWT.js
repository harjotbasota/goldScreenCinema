const jwt = require('jsonwebtoken');
const User = require('../Models/users')

const regenrateAccessToken = (req)=>{
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
        try{
            const payload = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_SECRET);
            const validUser = User.findOne({username:payload.username,email:payload.email});
            if(validUser){
                req.user = payload.username;
                return jwt.sign({username:payload.username,email:payload.email},
                    process.env.JWT_SECRET_ACCESS_KEY,
                    {expiresIn:'15m'})
            }else{
                return null
            }
        }catch(err){
            console.log('refresh token err',err);
            return null
        }
    }else{
        return null
    }
}

const verifyJWT = async (req,res,next)=>{
    const accessToken = req.headers['authorization'].split(' ')[1] || '';
    if(accessToken){
        try{
            const payload = jwt.verify(accessToken,process.env.JWT_SECRET_ACCESS_KEY);
            const verifyUser = await User.findOne({username:payload.username,email:payload.email});
            if(verifyUser){
                req.user = payload.username;
                return next();
            }else{
                return res.status(400).json({message:'Please Log in before Proceeding'});
            }
        }catch(err){
            if(err.name ==  'TokenExpiredError'){
                try{
                    const newAccessToken = regenrateAccessToken(req);
                    if(newAccessToken){
                        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                        return next();
                    }else{
                        return res.status(401).json({'message':'Session Expired. Please Login Again'})
                    }
                }catch(err){
                    return res.status(400).json({'message':'Please Login Again'})
                }
            }else{
                return res.status(400).json({message:'Please Log in and try again'})
            }
            
        }
    }else{
        return res.status(400).json({message:'Please log in'});
    }
}

module.exports = {verifyJWT};