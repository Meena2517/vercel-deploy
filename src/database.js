const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const url = "mongodb+srv://revanthpatnani:Vwh1JHBmcpYLvfRb@cluster0.0eselbe.mongodb.net/Employees?retryWrites=true&w=majority";

const connect = () => {
const url = process.env.MONGODB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    serverSelectionTimeoutMS: 30000 
})
    .then(() => {
        console.info("Connected to the DB")
    })
    .catch((e) => {
        console.log("Error", e);
    })
}

module.exports = { connect };

// const client = new MongoClient(url, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);