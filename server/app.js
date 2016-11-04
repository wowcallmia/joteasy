const PORT = process.env.PORT || 8000;


const MONGO_URI = process.env.MONGODB_URI || 'mongodb://johnsalay:Elbrus123@ds061246.mlab.com:61246/johndb';

const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

// DB CONNECT
mongoose.Promise = Promise;
mongoose.connect(MONGO_URI, (err) => {
  if (err) throw err;
  console.log(`MongoDB connected to ${MONGO_URI}`);
});

const app = express();
const server = require('http').createServer(app);

server.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

require('./config/webpack')(app);

app.use('/api', require('./routes/api'));

app.use('*', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});
