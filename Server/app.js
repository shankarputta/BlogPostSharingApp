const express = require('express');
const sequelize = require('./Database/database')
const user = require('./Models/User')
const post = require('./Models/Posts')
const bodyParser = require('body-parser');
const usersRoutes = require('./Router/User');
const PostRoutes = require('./Router/Post');


const app = express();


app.use(bodyParser.json());
//Handling CORS

app.use((req,res,next)=>{
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET , POST , PUT , PATCH ,DELETE');
   res.setHeader('Access-control-Allow-Headers', 'Content-Type , Authorization');
   next();
})


user.belongsToMany(user,{through: 'follow',as: 'Parents', foreignKey: 'following_user_id'})
user.belongsToMany(user,{through:'follow',as: 'Siblings', foreignKey: 'followed_user_id'})

post.belongsTo(user,{constraints:true,onDelete:'Cascade',foreignKey:'userId'})
user.hasMany(post )

app.use('/users', usersRoutes);
app.use('/posts', PostRoutes);

sequelize.sync().then(
    result =>{
        app.listen(8080);
    }
).catch(err =>{
    console.log(err)
})

