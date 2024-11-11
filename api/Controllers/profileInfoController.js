const User = require('../Models/users');

const profileInfoController = async (req,res) => {
    try{
        const validUser = await User.findOne({username:req.user});
        console.log('valid user:',validUser);
        const userProfile = {
            username: validUser.username,
            email: validUser.email,
            bookedShows: validUser.bookedShows
        }
        return res.status(200).json({message:userProfile})
    }catch(err){

    }
    res.status(200).json({message:req.user})
}

module.exports = {profileInfoController}