const User = require('../Models/User');
const httpStatus = require('http-status');
const Sequelize = require('sequelize');
const sequelize = require('../Database/database')
const { Op } = require("sequelize");


exports.getuser = (req,res,next)=>{
   const userId = req.query.userId;
   User.findByPk(userId).then(response => {
       const data = response.dataValues;
       return res.status(httpStatus.OK).json({username: data.username, followers: data.followers, followed: data.followed});
   })

}


exports.getProfile = async (req,res) => {
    const userId = req.query.userId;
    const profileId = req.query.profileId;
    const user = await User.findByPk(profileId)
    const response =  await sequelize.query('select 1 from follow where followed_user_id = ? and following_user_id = ?',{replacements:[profileId,userId]})
    let following = response[0].length > 0 ? true : false ;
    const data = user.dataValues;
    return res.status(httpStatus.OK).json({username: data.username, followers: data.followers, followed: data.followed, following: following});
}





exports.signup = (req,res) =>{

//    first we need to check if the user with same email address already exists in the database if yes don't insert if no insert
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    User.findAll({
            where:{
                email : email
            }
    }).then(user =>{
        if(user[0]){
           return  res.status(httpStatus.BAD_REQUEST).json({'message':'user already exits'});
        }else{
           return  User.create({email:email, password:password, username:username, followers: 0 , followed: 0});
        }
    }).then(response=>{
        console.log(response);
        return res.status(200).json(
            {message: 'user successfully created',
             userId: response.dataValues.id}
            );
    }).catch(error =>{
        throw error;
    })

}



exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
//    Check if the user already exists with the email address and password
    User.findAll({where: { email: email}}).then(response => {
        if (response[0]) {
            if (response[0].password === password) {
                return res.status(httpStatus.OK).json({userId: response[0].id, posts: response[0].getPosts()});
            }  else {
                return res.send(httpStatus.BAD_REQUEST).json({message: 'Invalid user details'});
            }
        }
    }).catch(error => {
        console.log(error);
        return res.sendStatus(500).json({'message': 'error occured while retreving the posts'});
    })
}


exports.getPeople =  async (req,res,next) => {
    const userId = Number(req.query.userId);
    const rs = await sequelize.query('CALL users_findUsers(?)', {replacements: [userId]});
    return res.status(httpStatus.OK).json({people: rs});
}


exports.follow =async (req,res,next) => {
    const userId = req.body.userId;
    const followUserId  = req.body.followUserId;
    await sequelize.query("insert into follow values (?,?,?,?)",{replacements:[new Date(),new Date(),userId,followUserId]});
    await sequelize.query('call expressy.users_followcount(?)',{replacements: [userId]});
    await sequelize.query('call expressy.users_followcount(?)',{replacements: [followUserId]});
    const user = await User.findByPk(followUserId)
    const response =  await sequelize.query('select 1 from follow where followed_user_id = ? and following_user_id = ?',{replacements:[followUserId,userId]})
    let following = response[0].length > 0 ? true : false;
    const data = user.dataValues;
    return res.status(httpStatus.OK).json({username: data.username, followers: data.followers, followed: data.followed, following: following});
}

exports.unfollow = async (req,res,next) => {
    const userId = req.body.userId ;
    const unfollowUserId = req.body.unfollowUserId ;
    await sequelize.query("delete from follow where following_user_id = ? and followed_user_id = ? ",{replacements:[userId,unfollowUserId]});
    await sequelize.query('call expressy.users_followcount(?)',{replacements: [userId]});
    await sequelize.query('call expressy.users_followcount(?)',{replacements: [unfollowUserId]});
    const response =  await sequelize.query('select 1 from follow where followed_user_id = ? and following_user_id = ?',{replacements:[unfollowUserId,userId]})
    let following = response[0].length > 0 ? true : false;
    const user = await User.findByPk(unfollowUserId)
    const data = user.dataValues;
    return res.status(httpStatus.OK).json({username: data.username, followers: data.followers, followed: data.followed, following: following});
}



