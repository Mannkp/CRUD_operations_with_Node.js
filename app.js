const express = require('express');
const userRoutes = require('./Controller/userRoutes')
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;

app.use(bodyParser.json()); //data coming from frontend is parsed into JSON OBJECT
const allowedOrigins = ['http://localhost:3000/', 'http://localhost:3001/'];    //it means only these two webpages or urls can access backend apis

//CORS: Cross Origin Resourse Sharing
//CORS is used to define selected urls or frontend webpages which can access BACKEND
// app.use(cors({
//     origin: function(origin, callback){
//         console.log('Origins: ', origin);
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.includes(origin)) return callback(null, true);
//         else{
//             return callback(new Error('DATABASE ACCESS NOT ALLOWED BY CORS!'));
//         }
//     }
// }))

app.use(cors()); //allows all frontend urls to access backend


app.get('/', (req,res) => {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.send("<h1 style='color: red;'>Welcome to mann ki site</h1>")
})

app.use('/userapis', userRoutes);


app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})