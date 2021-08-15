const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
const dbUri = process.env.ATLAS_URI;
const DB = process.env.DB_NAME;
const client = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      
      // checking if connection is successful
      if (db) {
        _db = db.db(DB);
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },



  getDb: function () {
    return _db;
  },
};

  //Connecting to mongoDb database via mongoose
  mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true},
    function(err) {
        if (err) throw err;
        console.log('Successfully connected to MongoDB via mongoose');
    })
