
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path'); 
const mongoose = require('mongoose');
const ConnectDB = require('./database/connection');
const app = express();
const PORT = process.env.PORT || 4000;
const connectDB = require('./database/connection');

//Criar conexaco a base dados
ConnectDB();

//Usar algunsMiddlewares

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret:'my secret key',
    saveUninitialized:true,
    resave:false,
}))

app.use((req,res,next)=>{

    res.locals.message = req.session.message;
    delete req.session.message;
    next();

})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));

//set template engine

app.set('view engine','ejs');

//router

app.use("",require("./routes/routes"))


app.listen(PORT,()=>{

    console.log(`server started at http://localhost:${PORT}`)
})



