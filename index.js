const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const { query } = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const run = async () => {
    try {

    }
    finally {

    }
}

run().catch(err => console.log(err));

app.get("/", async (req, res) => {
    res.send(`Hero Rider Server Running on Now PORT ${port}`);
})

app.listen(port, () => console.log(`Hero Rider Server Running on Now PORT ${port}`))