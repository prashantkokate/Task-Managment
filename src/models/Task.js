const mongoose= require('mongoose') 
const Schema= mongoose.Schema;     
const TaskSchema=new Schema({  
    title:{
        type:String,
    },
    description:{
        type: String,
    },
    status:{
        type:String,
        enum:["pending", "completed"],
        required:true
    }
},{timestamps:true});

const Task = mongoose.model('Task', TaskSchema) 
module.exports = Task; 

