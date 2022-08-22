const { Timestamp } = require("bson")
const mongoose= require("mongoose")

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    age:{
        type:String,
        required:true,
    },
    followers:{
        type: [],
        default:[]
    },
    following:{
        type:[],
        default:[]
    },
   
}, {
    timestamps:true
})

module.exports=mongoose.model("User",UserSchema);