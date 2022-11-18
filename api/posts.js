const express = require('express');
const postsRouter = express.Router();
const {getAllPosts} = require ('../db')

postsRouter.use ((req,res,next)=>{
    console.log("A request is being made to /posts");
    next();
})

postsRouter.get ('/', async (req,res)=>{
    const posts = await getAllPosts()
    res.send({
        posts
    })
})

module.exports = postsRouter;



// usersRouter.use((req, res, next) => {
//     console.log("A request is being made to /users");
  
//     next();
  
//   });
//   usersRouter.get ('/', async (req,res)=>{
//       const users = await getAllUsers()
//       res.send({
//           users
//       })
//   })