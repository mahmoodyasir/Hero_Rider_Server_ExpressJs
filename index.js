const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const { query } = require('express');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7f5wlkw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        const generalUserCollection = client.db('heroRider').collection('general_user');
        const learnerCollection = client.db('heroRider').collection('learner');
        const riderCollection = client.db('heroRider').collection('rider');

        app.post('/users', async (req, res) => {
            let finalResult1 = '';
            let finalResult2 = '';
            const data = req.body;
            const query = {
                email: data.email
            }
            const bool = await generalUserCollection.find(query).toArray();

            if (bool.length) {
                const message = "Same data already exists";
                return res.send({ acknowledged: false, message })
            }

            if (data.role === 'rider') {
                const rider = await riderCollection.insertOne(data);
                finalResult2 = rider

                const result = await generalUserCollection.insertOne({
                    email: data.email,
                    isAdmin: data.isAdmin,
                    blocked: data.blocked,
                    role: data.role,
                    imageUrl: data.imageUrl1
                });
                finalResult1 = result
            }
            else if (data.role === 'learner') {
                const learner = await learnerCollection.insertOne(data);
                finalResult2 = learner

                const result = await generalUserCollection.insertOne({
                    email: data.email,
                    isAdmin: data.isAdmin,
                    blocked: data.blocked,
                    role: data.role,
                    imageUrl: data.imageUrl1
                });
                finalResult1 = result
            }

            return res.send({ finalResult1, finalResult2 })


        })

    }
    finally {

    }
}

run().catch(err => console.log(err));

app.get("/", async (req, res) => {
    res.send(`Hero Rider Server Running on Now PORT ${port}`);
})

app.listen(port, () => console.log(`Hero Rider Server Running on Now PORT ${port}`))