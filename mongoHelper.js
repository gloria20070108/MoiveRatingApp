const q = require("q");
//const mongoConfig = require("./mongoConfig.js");

//const mongodbUrl = "mongodb://" + mongoConfig.mongodbHost + ":27017";

const MongoClient = require("mongodb").MongoClient;
const mongodbUrl =
  "mongodb+srv://user01:neuneuneu@cluster0.ym8ju.mongodb.net/users?retryWrites=true&w=majority";

exports.localReg = (username, password) => {
  console.log(username, password);

  const deferred = q.defer();

  MongoClient.connect(mongodbUrl, (err, client) => {
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

const mongodbUrlmovie =
  "mongodb+srv://user01:neuneuneu@cluster0.ym8ju.mongodb.net/movieflex?retryWrites=true&w=majority";

exports.addcomments = (movie_name, comments) => {
  console.log(comments);
  console.log(movie_name);

  const deferred = q.defer();

  MongoClient.connect(mongodbUrlmovie, (err, client) => {
    const db = client.db("movieflex");
    const collection = db.collection("movies");

    const moviecomments = {
      movie_name: movie_name,
      comments: comments,
    };

    console.log("inserting comment");

    collection.insertOne(moviecomments).then(() => {
      client.close();
      deferred.resolve(moviecomments);
    });
    return deferred.promise;
  });
};
