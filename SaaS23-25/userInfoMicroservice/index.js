const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const userRoute = require("./routes/routes.js");

app.use(express.json());

app.use('/', userRoute )

/* Define healthcheck route that checks if the MongoDB connect can be succesfully established or not.
   In each case we send appropriate message */
app.get('/healthcheck', (req, res) => {
  mongoose.connect('mongodb://userinfodb:27017/userInfos', {useNewUrlParser: true, useUnifiedTopology: true,},)
  .then(()=> res.status(200).json({ message: 'MongoDB connection successful' }))
  .catch(()=> res.status(400).json({ message: 'MongoDB connection unsuccessful' }))
});

// Connect to DB
mongoose.connect('mongodb://userinfodb:27017/userInfos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userInfodb = mongoose.connection;
userInfodb.on('error', console.error.bind(console, 'connection error:'));
userInfodb.once('open', function () {
  console.log('Connected to userInfo DB database');
});

module.exports = app;

const httpServer = http.createServer(app);
httpServer.listen(3000, () => {
    console.log('HTTP UserInformation Microservice running on port 3000');
});