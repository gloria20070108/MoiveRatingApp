const q = require("q");
const mongoConfig = require("./mongoConfig.js");

const mongodbUrl = "mongodb://" + mongoConfig.mongodbHost + ":27017";
//const mongodbUri = 'mongodb+srv://user01:neuneuneu@cluster0.ym8ju.mongodb.net/moviesflix?retryWrites=true&w=majority'
//const client = new MongoClient(uri)
const MongoClient = require("mongodb").MongoClient;

exports.localReg = (username, password) => {
  console.log(username, password);

  const deferred = q.defer();

  MongoClient.connect(mongodbUrl, (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
    const db = client.db("users");
    const collection = db.collection("localUsers");

    //check if username is already assigned in our database
    collection.findOne({ username: username }).then((result) => {
      if (null != result) {
        console.log("USERNAME ALREADY EXISTS:", result.username);
        deferred.resolve(false); // username exists
      } else {
        const user = {
          username: username,
          password: password,
        };

        console.log("CREATING USER:", username);

        collection.insert(user).then(() => {
          client.close();
          deferred.resolve(user);
        });
      }
    });
  });

  return deferred.promise;
};

exports.localAuth = (username, password) => {
  const deferred = q.defer();

  MongoClient.connect(mongodbUrl, (err, client) => {
    const db = client.db("users");
    const collection = db.collection("localUsers");

    collection.findOne({ username: username }).then((result) => {
      if (null == result) {
        console.log("USER NOT FOUND:", username);

        deferred.resolve(false);
      } else {
        console.log("FOUND USER: " + result.username);

        if (result.password === password) {
          deferred.resolve(result);
        } else {
          console.log("AUTHENTICATION FAILED");
          deferred.resolve(false);
        }
      }

      client.close();
    });
  });

  return deferred.promise;
};
