// Configure the environment variable to hide api keys from public
const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
// Configure express to run server and routes
const express = require('express');
//Set up cors for cross-origin allowance
const cors = require('cors');
// Allow express to use body-parser as middleware
const bodyParser = require('body-parser');
// Axios to make API requests
const axios = require('axios');
// Configure the application to use express
const app = express();
// Initialize the main project project using path.resolve()
app.use(express.static(path.resolve("dist")));
// app.use(express.static(path.resolve(__dirname, "../src/views/index.html")));
console.log(__dirname)

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

// Set up the server at port 8000
const port = process.env.PORT || 8000;
const server = app.listen(port, function listener(){
    console.log("Server is working at port: " + port);
});

app.get('/', (req, res) => {
    // res.sendFile(path.resolve('src/client/views/index.html'));
    res.sendFile('dist/index.html')
});
