const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("connected to mongodb");

    const db = client.db("spots");
    
  } finally {
    await client.close();
    console.log("closing connection")
  }
}
connect().catch(console.log);