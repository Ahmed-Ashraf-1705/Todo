var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
var config = require('../config/connection.db');
var passport = require('passport')



// Register
router.post('/register', (req,res,next)=>{
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    });
    User.addUser(newUser, (err, usr)=>{
        if(err){
            res.json({
                success: false, message: "failed to register user, try to use another email"
            });
        }else{
            res.json({
                success: true, message: "user registered"
            });
        }
    });
});
// Authenticate / login
router.post('/authenticate', (req,res,next)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.getUserByEmail(email, (err,usr)=>{
        if (err) throw err;
        if(!usr){
            return res.json({success : false, message: "user not found"});
        }else{
            User.comparePassword(password,usr.password, (err,isMatch)=>{
                if (err) throw err;
                if(isMatch){
                    const token = jwt.sign(usr.toJSON(),config.secret,{ // user makes error if u pass it without stringify it , solution usr.toJSON()
                        expiresIn : 1000000 // 7 days token in seconds
                    });
                    res.json({success : true, token : 'beerer '+token,
                    user : { _id : usr._id , name : usr.name, email: usr.email,todos:usr.todos}});
                }
                else{
                    res.json({success : false, message : "invalid email or password!"});
                }
            });
        }
    });
});

// profile
router.get('/profile',passport.authenticate('jwt',{ session: false }), (req,res,next)=>{
    return res.json({user : req.user}); 
});

// get by id 
router.post('/getbyid',(req,res)=>{
    let _id = req.body._id;
    User.findById(_id,(err,doc)=>{
        if(err){
            return res.json({success : false , message:err});
        }else{
            return res.json({success : true , message:doc});
        }
    })
});

// add todo
router.post('/newtodo',(req,res)=>{
    let em = req.body.email;
    let todo = req.body.todo;
    User.newTodo(em,todo,(err,result)=>{
        if(err){
            return res.json({success : false , message : err});
        }
        if(todo != null ){
            return res.json({success: true, message : result});
        } else {
            return res.json({success: false, message : "cannot add null todo"});
        }
        
    });
});

// list todos
router.post('/listtodos',(req,res)=>{
    let _id = req.body._id;
    User.listTodos(_id,(err,result)=>{
        if(err){
            return res.json({success : false , message : err});
        }
        if (result == null){
            return res.json({success: false, message : "List is empty!"});
        }else{
            console.log(result)
            return res.json({success: true, message : result});
        }
        
        
        
    });
});
// edit todo
router.post('/edittodo',(req,res)=>{
    let todoId = req.body.todoId;
    let todo = req.body.todo;
    User.editTodo(todoId,(err,result)=>{
        if(err){
            return res.json({success : false , message : err});
        }
        return res.json({success: true, message : result});
    });
});


module.exports = router;






