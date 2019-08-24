const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:utilController');
// var config = require('../config.js');
var config = require('../../config/config.js');
var mongoose = require('mongoose');

// const url = 'mongodb://'+config.db.USER+':'+config.db.PWD+'@'+config.db.HOST+':'+config.db.PORT+'/?authMechanism=SCRAM-SHA-1&authSource='+config.db.database;
const url = 'mongodb://'+config.db.HOST+':'+config.db.PORT+'/';//+config.db.database;
var db = null;

// exports.setupDB = async function () {
//   // const url = process.env.DB_URL;
//   debug(`attempting to connect to database at ${url}`);
//   const dbName = 'test';
//   try {
//     const client = await MongoClient.connect(url, { useNewUrlParser: true });
//     const db = client.db(dbName);
//     const collection = await db.collection('projects');
//     return ({ client: client, collection: collection })
//   }
//
//   catch (err) {
//     debug(err);
//   }
// };

exports.connectDB = async function () {
  debug('in connecting function');
  try {
    console.log(url);
    // mongoose.connect(uri);
    mongoose.connect(url+config.db.database, { useNewUrlParser: true }, {useMongoClient: true});
    // mongoose.connect(uri,opts);
    mongoose.Promise = global.Promise;

    var nodeCleanup = require('node-cleanup');
    nodeCleanup(function (exitCode, signal) {
        // release resources here before node exits
        mongoose.disconnect();
    });
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }

  catch (err) {
    debug(err);
  }

};
