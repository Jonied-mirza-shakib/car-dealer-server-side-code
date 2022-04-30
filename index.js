const express = require('express')
const app = express()
let cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.car_name}:${process.env.pass}@cluster0.6kfue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    await client.connect();
    const usersDataCollection = client.db('car').collection('carData');
    try {

        app.get('/data', async (req, res) => {
            const query = {};
            const cursor = usersDataCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })

        app.get('/data/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersDataCollection.findOne(query);
            res.send(result);
        })

        // post method 

        app.post('/data', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await usersDataCollection.insertOne(newUser);
            res.send(result)
        })

        // put method 
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updateUser = req.body;
            const filter = { _id: isObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email,
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

    } finally {

    }

}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})