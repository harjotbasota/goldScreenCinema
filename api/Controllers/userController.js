const User = require("../Models/users");
const bcrypt = require('bcrypt');

const signUpUserController = async (req,res)=>{
    try{
        const user = {
            username : req.body.username,
            email : req.body.email,
            password : await bcrypt.hash(req.body.password,10)
        }
        const existingUser = await User.findOne({username:req.body.username});
        const existingEmail = await User.findOne({email: req.body.email});
        if(existingUser || existingEmail){
            res.status(409).json({'message':'Username Or Email Not Available !!! Try different Credentails'})
        }else{
            try{
            await User.create(user);
            res.status(200).json({'message':'Account Created.'})
            }catch(err){
                res.status(400).json({'message':'Something Went Wrong. Try Again Later!!!'})
            }
        }
    }catch(err){
        res.status(400).json({'message':'Something Went Wrong. Try Again Later!!!'});
    }
}

const logInUserController = async (req,res)=>{
    try{
        console.log(req.body);
        const validUser = await User.findOne({email:req.body.email})
        console.log('valid user',validUser);
        if(validUser){
            const validPassword = await bcrypt.compare(req.body.password,validUser.password);
            if(validPassword){
                res.status(200).json({'message':'Login Successful'});
            }else{
                res.status(401).json({'message': 'Invalid Password'});
            }
        }else{
            res.status(401).json({'message': 'Invalid Email'});
        }
    }catch(err){
        res.status(400).json({'message':'FAILDED TO LOGIN!!! TRY AGAIN'})
    }
}

module.exports = {signUpUserController,logInUserController};