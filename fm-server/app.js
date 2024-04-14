// import modules
const express= require('express');
const mongoose=require('mongoose');
const morgan= require('morgan');
const cors=require('cors');
require('dotenv').config();


// *************************************************************************
// app
const app=express();


// *************************************************************************
// db
mongoose.connect(process.env.MONGO_URI,{
    // userNewUrlParser: true,
    // userUnifiedTopology: true,
}).then(()=> console.log("DB Connected"))
.catch((error)=>console.log("DB Connection error: ",error));



// *************************************************************************
// middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials:true}));



// *************************************************************************
// routes
const testRoutes=require("./routes/test");
app.use("/", testRoutes);




// *************************************************************************
// port
const port=process.envPORT || 8080; // if env file is running then use that port itself, if not running then use 8080;





// *************************************************************************
// listener
const server=app.listen(port, ()=>
    console.log(`Server is running on port: ${port}`)
);