const express = require("express");

const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
// const uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster8-shard-00-00.4aijm.mongodb.net:27017,cluster8-shard-00-01.4aijm.mongodb.net:27017,cluster8-shard-00-02.4aijm.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-fgs0x1-shard-0&authSource=admin&retryWrites=true&w=majority`;

// const uri =`mongodb://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster8.4aijm.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster8.4aijm.mongodb.net/?retryWrites=true&w=majority`;
// user:fahad10 
// pw: Nq2S57GBJC5Jjmee


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    
    const warehouseCollection = client.db("warehousedb").collection("fruits");
  
  
    
  

    // get all items
    // /items
    // password:hPjqCjwnLXVnidbQ
    //user: fahad5
    app.get("/items", async (req, res) => {
      const query = {};
      const result = await warehouseCollection.find(query).toArray();
      res.send(result);
    });

   

    // find one item by id
    // /item/6274a3425a04790168facc8c
    app.get("/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await warehouseCollection.findOne(filter);
      res.send(result);
    });
    // find one item by email
    // /addedby/abdullah71faisal@gamil.com
    app.get("/addedby/:email", async (req, res) => {
      const email = req.params.email;
      const filter = { addedby:email};
      const result = await warehouseCollection.find(filter).toArray();
      res.send(result);
    });

    // create one item
    // /item
    app.post("/item", async (req, res) => {
      const item = req.body;
      const result = await warehouseCollection.insertOne(item);
      res.send({ message: "item added" });
    });

    //update item
    // /item/6274a3425a04790168facc8c
    app.put("/item/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const updateItem = {        
        $set: req.body,
      };
      const result = await warehouseCollection.updateOne(filter, updateItem);
      res.send({message: "item updated"})
    });

    // delete item
    // /item/6274a3425a04790168facc8c
    app.delete("/item/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        const result = await warehouseCollection.deleteOne(filter);  
        res.send({message: "the item deleted"})
      });

  } finally {
   
  }
}
run().catch(console.dir);

// backend initialize

app.get("/items", (req, res) => {
  res.send("running warehouse");
});
app.get("/item", (req, res) => {
  res.send("fahad here");
});

app.listen(port, () => {
  console.log("listening port", port);
});
