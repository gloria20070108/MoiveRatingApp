require("mongodb");
async function connectdb() {
  const uri =
    "mongodb+srv://user01:neuneuneu@cluster0.ym8ju.mongodb.net/users?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    return client;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports.connectdb = connectdb;
