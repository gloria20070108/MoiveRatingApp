const MongoClient = require("mongodb").MongoClient;
const q = require("q");
const mongodbUrl =
  "mongodb+srv://user01:neuneuneu@cluster0.ym8ju.mongodb.net/users?retryWrites=true&w=majority";
// const client = new MongoClient(mongodbUrl);

// client.connect();

// MongoClient.connect(mongodbUrl);

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

exports.getMovies = (name, year) => {
  const deferred = q.defer();

  MongoClient.connect(mongodbUrl, (err, client) => {
    const db = client.db("movieflex");
    const collection = db.collection("descriptions");

    const mongoRequest = {};

    if (name) {
      mongoRequest.movie_name = { $regex: ".*" + name.toUpperCase() + ".*" };
    }

    if (year) {
      mongoRequest.year = year;
    }

    const result = collection.find(mongoRequest).toArray();
    deferred.resolve(result);
    client.close();
  });

  return deferred.promise;
};

exports.createMovies = (name, year) => {
  const deferred = q.defer();

  MongoClient.connect(mongodbUrl, (err, client) => {
    const db = client.db("movieflex");
    const collection = db.collection("descriptions");

    collection.findOne({ movie_name: name }).then((result) => {
      if (null != result) {
        console.log("MOVIE ALREADY EXISTS:", name);
        deferred.resolve(false); // movie exists
        client.close();
      } else {
        const newMovie = {
          movie_name: name,
          year: year,
          rate: 3.0,
        };

        console.log("CREATING Movie:", name);

        collection.insert(newMovie).then(() => {
          client.close();
          deferred.resolve(newMovie);
        });
      }
    });
  });

  return deferred.promise;
};

exports.addcomments = (movie_name, comments) => {
  const deferred = q.defer();

  MongoClient.connect(mongodbUrl, async (err, client) => {
    const db = client.db("movieflex");
    const collection = db.collection("movies");

    const moviecomments = {
      movie_name: movie_name,
      comments: comments,
    };
    try {
      result = await collection.insertOne(moviecomments);
      client.close();
      deferred.resolve(result);
    } catch (err) {
      console.error("adding comments wrong");
      deferred.resolve(false);
      client.close();
    }
  });

  return deferred.promise;
};

exports.getcomments = (movie_name) => {
  const deferred = q.defer();
  MongoClient.connect(mongodbUrl, async (err, client) => {
    const db = client.db("movieflex");
    const collection = db.collection("movies");
    try {
      const result = await collection
        .find({ movie_name: movie_name })
        .toArray();
      console.log(result);
      client.close();
      deferred.resolve(result);
    } catch (err) {
      console.error("getting comments wrong");
      deferred.resolve(false);
      client.close();
    }
  });

  return deferred.promise;
};

exports.getdescriptions = (movie_name) => {
  const deferred = q.defer();
  MongoClient.connect(mongodbUrl, async (err, client) => {
    const db = client.db("movieflex");
    const collection = db.collection("descriptions");
    try {
      const result = await collection.findOne({ movie_name: movie_name });
      console.log(result);
      client.close();
      deferred.resolve(result);
    } catch (err) {
      console.error("getting descriptions wrong");
      deferred.resolve(false);
      client.close();
    }
  });

  return deferred.promise;
};
exports.addlike = async (movie_name, like) => {
  const db = client.db("movieflex");
  const collection = db.collection("descriptions");
  console.log(parseInt(like));
  like = parseInt(like) + 1;
  try {
    result = await collection.update(
      { movie_name: movie_name },
      { $set: { like: like } }
    );
  } catch (err) {
    console.error("update like count done");
  }
};
