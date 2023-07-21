const express = require('express')

const connectDB = require('./config/config') //./ means in current directory go to config folder and import from config.js file
const dotenv=require('dotenv')


const morgan = require('morgan')

//config dotenv
dotenv.config()
//The config() function is a method provided by the dotenv package. 
//It loads the variables from the .env file and makes them available as key-value pairs in the process.env object, 
//which is a built-in object in Node.js for accessing environment variables.


//call function to connect to mongodb
connectDB()


const app =  express()
//created a REST object 'app' to use the express functions 

//middleware
app.use(express.json())
app.use(morgan('dev'))

//route

app.use("/api/pizzas",require("./routes/pizzaRoute"));
app.use("/api/users",require("./routes/userRoute"));
app.use("/api/orders",require("./routes/orderRoute"));
app.use("/api/inventory",require("./routes/inventoryRoute"));
app.use("/api/mail",require("./routes/mailerRoute"));

app.get('/',(req,res)=>{
    res.send("<h1>hello from node server via nodemon</h1>")
})

    //CRUD Operations : GET POST PUT DELETE
    //this function takes two parameters => 1. Path 2.(req,res)=>{} callback function
    //req => data given by user
    //res => to send data to user

const port=process.env.PORT || 8080;
//create a port to run on
app.listen(8080, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode, on port ${port}`)
})