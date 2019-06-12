var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// user schema
var userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type : String,
        unique: true
    },
    password : {
        type: String,
        required: true
        
    },todos : [{
        completed : { type:Boolean,
            default:false 
        },
        title : { type:String
            ,default: null}
    }]
});

// object that we will use from outside
var User = mongoose.model('Users',userSchema);

// functions of that object
User.getUserByEmail = function(email,callback){
    const query = {email:email}
    User.findOne(query,callback);
}

User.getUserById = function(_id,callback){
    User.findById(_id,callback);
}

// register user
User.addUser = function(user,callback){
    bcrypt.genSalt( 10, (err,salt)=>{
        bcrypt.hash(user.password, salt, (err,hash)=>{
            if (err) throw err;
            user.password = hash;
            user.save(callback);
        });
    });
}

// comparing password with hash
User.comparePassword = function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        callback(null,isMatch);
    })
}

// new todo
User.newTodo = function(email,todo,callback){
    User.findOneAndUpdate({email:email},{$push:{"todos":todo}},(err,user)=>{
        if(err){
            console.log('Error happened when add new todo, details:'+err);
            callback('cannot create new todo right now!');
        }else{
            callback(null,'todo created successfully!'); // send data with callback
        }
    });
}

// edit todo
User.updateTodo = function(userId,todo_id,todo,callback){
    User.findOne({_id :userId},(err,doc)=>{
        if (err){
            console.log('err')
        } else{
            
            
            User.updateOne({'_id':doc._id,'todos._id':todo_id},{$set:{'todos.$.completed':todo.completed}},(err,res)=>{
                if(err){
                    callback('error happened');
                }else{
                    //console.log( 'success'+JSON.stringify(res))
                }
            });
        }
    })
}

// list todos
User.listTodos = function(_id,callback){
    User.findById(_id,(err,docs)=>{
        if(err){
            console.log('Error happened when fetching data, details:'+err);
            callback('Server error!');
        }else{
            if( docs.todos.length == 0 || docs.todos == null){
                callback(false,'List is empty or null!');
            }else {
                callback(null,docs.todos); // send data with callback 
            }
        }
    });
}



module.exports = User;
