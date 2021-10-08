import mongoose from 'mongoose';

const connection = {
  isConnected: false,
};

async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}

// function convertDocToObj(doc) {
//   doc._id = doc._id.toString();
//   doc.createdAt = doc.createdAt.toString();
//   doc.updatedAt = doc.updatedAt.toString();
//   return doc;
// }

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;

// import { MongoClient } from 'mongodb';

// const MONGODB_URI = process.env.MONGODB_URI;
// const MONGODB_DB = process.env.DB_NAME;

// // check the MongoDB URI
// if (!MONGODB_URI) {
//   throw new Error('Define the MONGODB_URI environmental variable');
// }

// // check the MongoDB DB
// if (!MONGODB_DB) {
//   throw new Error('Define the MONGODB_DB environmental variable');
// }

// let cachedClient = null;
// let cachedDb = null;

// export async function connectToDatabase() {
//   // check the cached.
//   if (cachedClient && cachedDb) {
//     // load from cache
//     return {
//       client: cachedClient,
//       db: cachedDb,
//     };
//   }

//   // set the connection options
//   const opts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   // Connect to cluster
//   let client = new MongoClient(MONGODB_URI, opts);
//   await client.connect();
//   let db = client.db(MONGODB_DB);

//   // set cache
//   cachedClient = client;
//   cachedDb = db;

//   return {
//     client: cachedClient,
//     db: cachedDb,
//   };
// }
