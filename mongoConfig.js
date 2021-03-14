require("mongodb");
async function connectdb() {
  const uri = process.env.MONGO_URI;

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
