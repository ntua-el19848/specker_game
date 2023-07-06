const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');
const storeRoute = require("./routes/routes.js");

app.use(express.json());


app.get('/healthcheck', (req, res) => {
  mongoose.connect('mongodb://storegetdb:27017/storeJson', {useNewUrlParser: true, useUnifiedTopology: true,},)
  .then(()=> res.status(200).json({ message: 'MongoDB connection successful' }))
  .catch(()=> res.status(400).json({ message: 'MongoDB connection unsuccessful' }))
});


app.use('/', storeRoute )

// Connect to DB
mongoose.connect('mongodb://storegetdb:27017/storeJson', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storeJsondb = mongoose.connection;
storeJsondb.on('error', console.error.bind(console, 'connection error:'));
storeJsondb.once('open', function () {
  console.log('Connected to storeJson DB database');
});

module.exports = app;

const httpServer = http.createServer(app);
httpServer.listen(3200, () => {
    console.log('HTTP StoreAndGet Microservice running on port 3200');
});