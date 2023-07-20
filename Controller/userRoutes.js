const express = require('express');
const fs = require('fs');
const path = require('path');

const Router = express.Router();
const dataFilePath = path.join(__dirname, '../UserDataBase.json');

function readDataFromFile(){
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}
function writeDataToFile(data){
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    // return JSON.parse(data);
}

//read (display) data using get request
Router.get('/userData', (req, res) => {
    const userData = readDataFromFile();
    res.send(userData);
})

//to find a specific user based on his/her ID
Router.get('/userData/:id', (req, res) => {
    const userData = readDataFromFile();
    const userId = req.params.id;

    const user = userData.find(user => user.id == userId);
    if(user){
        res.send(userData);
    }
    else{
        res.statusCode = 404;
        res.send({
            error: 'user not found!'
        });
    }
})


//to write data to a specific user based on his/her ID
Router.post('/userData', (req, res) => {
    const userData = readDataFromFile();
    const user = req.body;
    console.log("user: ", user);
    user.id = new Date().getTime();

    userData.push(user);
    writeDataToFile(userData);

    res.send(userData);
    // const userId = req.params.id;

    // const user = userData.find(user => user.id == userId);
    // if(user){
    //     res.send(userData);
    // }
    // else{
    //     res.statusCode = 404;
    //     res.send({
    //         error: 'user not found!'
    //     });
    // }
})



Router.get('/', (req,res) => {
    console.log("request made by the client is: ", req.url);
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.send({
        message: 'welcome to user apis',
        path: dataFilePath
    });
    // http://localhost:8000/userapis/test
})

Router.get('/aboutMe', (req,res) => {
    console.log("request made by the client is: ", req.url);
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.write('<h1>ABOUT ME:<br>MANNKUMAR K. PANDYA</h1>');
    res.write('<h1>welcome to userAPIs</h1>');
    // http://localhost:8000/userapis/aboutMe
})

module.exports = Router;