const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// middleware

 
app.use(cors());
app.use(express.json());

// mondgodeb Collect Start

const uri =
 
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v9rdx72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const tourCollection=client.db('touristDB').collection('addtourist')
    //   Create Method
      app.post('/tour', async (req, res) => {
          const newtour = req.body;
          console.log(newtour);
          const result = await tourCollection.insertOne(newtour);
          res.send(result)
      })
      // Read Method
      app.get('/tours', async (req, res) => {
          const coursor = await tourCollection.find().toArray()
          res.send(coursor)
      })
      
      

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("NOW PLAY NOW THIS GAME  <<<< >>>>>");
});
app.listen(port, () => {
  console.log(`Coffee Server is Runninge port:${port}`);
});
