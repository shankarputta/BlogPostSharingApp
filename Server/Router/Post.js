const express  = require('express');
const Posts = require('../controllers/Post')


router = express.Router();

router.post('/createPost',Posts.createPost);

router.get('/',Posts.getPosts);

router.get('/allPosts',Posts.getAllPosts);

router.get('/getPost',Posts.getPost);

router.delete('/deletePost',Posts.deletePost);

module.exports = router;
