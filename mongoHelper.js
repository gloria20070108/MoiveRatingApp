const MongoClient = require("mongodb").MongoClient;
const q = require("q");
const uri =
  "mongodb+srv://user01:neuneuneu@cluster0.ym8ju.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri);

client.connect();

const mongodbUrl =
  "mongodb+srv://user01:neuneuneu@cluster0.ym8ju.mongodb.net/users?retryWrites=true&w=majority";
MongoClient.connect(mongodbUrl);

exports.localReg = (username, password) => {
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

exports.addcomments = async (movie_name, comments) => {
  const db = client.db("movieflex");
  const collection = db.collection("movies");

  const moviecomments = {
    movie_name: movie_name,
    comments: comments,
  };
  try {
    result = await collection.insertOne(moviecomments);
  } catch (err) {
    console.error("adding comments wrong");
  }
};

exports.getcomments = async (movie_name) => {
  const db = client.db("movieflex");
  const collection = db.collection("movies");
  try {
    const result = await collection.find({ movie_name: movie_name }).toArray();
    console.log(result);
    return result;
  } catch (err) {
    console.error("getting comments wrong");
  }
};
exports.getdescriptions = async (movie_name) => {
  const db = client.db("movieflex");
  const collection = db.collection("descriptions");
  try {
    const result = await collection.findOne({ movie_name: movie_name });
    console.log(result);
    return result;
  } catch (err) {
    console.error("getting descriptions wrong");
  }
};
