const mongoose = require('mongoose');

async function run() {
  try {
    const uri = "mongodb://anishkumar232336_db_user:P4GAcSkdHVv9qvF0@ac-79hsrco-shard-00-00.3ht8uip.mongodb.net:27017,ac-79hsrco-shard-00-01.3ht8uip.mongodb.net:27017,ac-79hsrco-shard-00-02.3ht8uip.mongodb.net:27017/vishu-banking?ssl=true&replicaSet=atlas-usnf2i-shard-0&authSource=admin&retryWrites=true&w=majority";
    await mongoose.connect(uri);
    console.log('Connected to Atlas DB');

    const db = mongoose.connection.db;
    const servicesCollection = db.collection('services');
    const firstService = await servicesCollection.findOne();
    console.log('Raw service document from DB:', firstService);

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
