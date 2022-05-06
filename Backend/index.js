const mongoose =require('mongoose');
const express=require('express');
const app= express();
const todos=require('./routes/todos');


mongoose.connect('mongodb://localhost/TodoApp')
.then(()=>console.log('Connected to mongodb (TodoApp database)...'))
.catch(err=>console.log('Could not connect to MongoDb'));


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET,PATCH,PUT,POST,DELETE");
        return res.status(200).json({});
    }
    next();
})

app.use(express.json());
app.use('/api/todos',todos);


const port =process.env.PORT||40;
app.listen(port,()=>{console.log(`Listening todo app on port ${port}...`)});