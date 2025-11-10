const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"], // ✅ remove trailing slash
    credentials: true,
  })
);


// userer
// 0SRCphnmBHoZxPZa

const uri =
  "mongodb+srv://userer:0SRCphnmBHoZxPZa@cluster0.othhavn.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("model-1");
    const modelCollection = db.collection("models-collection");

    // app.get("/modelCollec", async (req, res) => {
    //   const result = await modelCollection.find().toArray();

    //   res.send(result);
    // });


    app.post("/models-collection", async (req, res) => {
      try {
        const newTransaction = req.body;
        const result = await modelCollection.insertOne(newTransaction);
        res.status(201).send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error inserting transaction" });
      }
    });

    // app.post('/models-collection', async(req,res)=>{
    //   const result= modelCollection.insertOne()

    // })

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB"
    );
  } finally {
  }
}
run().catch(console.dir);

app.use(
  cors({
    origin: ["http://localhost:5173/"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World hows going on!");
});

app.get("/yelow", (req, res) => {
  res.send(" hows going!");
});

app.listen(port, () => {
  console.log(`sever is listening on port ${port}`);
});
