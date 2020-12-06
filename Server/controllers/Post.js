
const user = require('../Models/User');
const posts = require('../Models/Posts');
const httpStatus = require('http-status');
const sequelize = require('../Database/database');

exports.createPost = (req,res,next) => {
    const userId = req.body.userId;
    const title  = req.body.title;
    const description = req.body.description;
    console.log(title);
    user.findAll({where: {id: userId}})
        .then(response => {
                    if (response[0]) {
                      return response[0].createPost({
                            Title: title,
                            Description: description,
                            Likes: 0,
                            disLikes: 0,
                        })
                    } else {
                        return res.status(httpStatus.BAD_REQUEST).json({'message': 'Invalid user'});
                    }
        }).then (response => {
            return res.status(httpStatus.OK).json({'message': 'SuccessFully uploaded the post'});
    }).catch(err => {
        console.log(err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({'message': 'unknown error occurred'});
    })
}

exports.getPosts = (req,res,next) => {
    const userId = req.query.userId;
    posts.findAll({where: {userId : userId}}).then(response => {
            return res.status(httpStatus.OK).json({posts: response});

    }).catch(err => {
        console.log(err);
        return res.send(httpStatus.FORBIDDEN).json({'message': 'unknown error occurred'});
    })
}

exports.getAllPosts = async  (req,res) => {
    const userId = req.query.userId;
    const rs = await sequelize.query('call expressy.Posts_getPosts(?)',{replacements:[userId]});
    return res.status(httpStatus.OK).send({data:rs});
}

exports.getPost = async (req,res) => {
    const id = req.query.postId;
    const response = await posts.findByPk(id);
    return res.status(httpStatus.OK).send(response)
}

exports.deletePost = async (req,res) => {
    const id = req.query.postId;
    const userId = req.query.userId ;
    const response = await posts.findByPk(id);
    await response.destroy();
    const postsDetails = await posts.findAll({where:{userId: userId}})
    return res.status(httpStatus.OK).json({posts: postsDetails});
    return res.status(httpStatus.OK).send({message: 'Delete Successfully'});
}
