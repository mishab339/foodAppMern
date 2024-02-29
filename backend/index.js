const express = require('express');
const app = express();
const mongoDB = require('./db')
const PORT = 5000;
mongoDB();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));
app.get('/',(req,res)=>{
    res.send('hello world...');
 });
app.listen(PORT,()=>{
    console.log(`app is listening on the prot number ${PORT}`);
})