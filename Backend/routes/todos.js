const { Todo ,validate} = require ('../model/todo');
const mongoose =require('mongoose');
const express= require('express');
const router =express.Router();



router.get('/', async (req,res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
	const todos = await Todo.find().sort('name');
	res.send(todos);
	});

router.get('/:id',async (req,res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
	const todo = await Todo.findById(req.params.id);
	
	if(!todo) return res.status(404).send("The todo with the given id was not found");
	
	res.send(todo);
	})

router.post('/',async(req,res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
     // manual input validation
    // if(!req.body.name || req.body.name.length<3){
    //     return res.status(400).send({error:"name is required and should be length of minimum 3"});
    // }
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	
	let  todo = new Todo({
		name:req.body.name,
        
		});
	todo = await todo.save();
	res.send(todo);
	})

router.patch('/:id',async (req,res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
    if(req.params.id.length<24) return res.status(404).send("The todo with the given id was not found");
	const {error} = validate(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	
	const todo =await Todo.findByIdAndUpdate(req.params.id,{name:req.body.name},{new :true})
	
	if(!todo) return res.status(404).send("The todo with the given id was not found");
	
	res.send(todo);
	})

router.delete('/:id',async (req,res)=>{
    // res.set('Access-Control-Allow-Origin', '*');
    if(req.params.id.length<24) return res.status(404).send("The todo with the given id was not found");
	const todo = await Todo.findByIdAndRemove(req.params.id);
	
	if(!todo) return res.status(404).send("The todo with the given id was not found");
	

	res.send(todo);
	})



module.exports =router;

	
/*
    app.get('/api/todos/:year/:month',(req,res)=>{
    //res.send(req.params);
    //result of the above query params
    // http://localhost:4000/api/todos/2021/8

    
    {
    "year": "2021",
    "month": "8"
     }
    
   res.send(req.query);
   //result for the query params(comes after ?)
    // http://localhost:4000/api/todos/2021/8?sortBy=name

    
    {
    "sortBy": "name"
    }
    
   // http://localhost:4000/api/todos/2021/8?sortBy=name&orderBy=id

    
    {
    "sortBy": "name",
    "orderBy": "id"
    }
    
});

*/


