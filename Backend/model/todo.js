const mongoose =require('mongoose');
const Joi =require('joi');

const todoSchema =new mongoose.Schema(
	{
		name:{
			type:String,
			required:true,
			minlength:5,
			maxlength:50
		}
        ,
        completed:{
            type:Boolean,
            required:true,
            default:false
        }
	}
)

const Todo = mongoose.model('Todo',todoSchema);

function validateTodo(todo){
	const schema ={
		name:Joi.string().min(5).required()
        
	}
	return Joi.validate(todo,schema);
	}
 exports.Todo =Todo;
 exports.validate = validateTodo;