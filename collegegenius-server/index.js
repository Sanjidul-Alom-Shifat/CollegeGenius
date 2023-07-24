const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 5000;
const { toast } = require('react-toastify');

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q5tkpfw.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        // collection
        const usersCollection = client.db('CollegeGeniusDB').collection('users');
        const collegesCollection = client.db('CollegeGeniusDB').collection('colleges');
        const admissionCollection = client.db('CollegeGeniusDB').collection('admission');


        const indexKeys = { collegeName: 1 };
        const indexOptions = { name: "toyname" };

        const result = await collegesCollection.createIndex(indexKeys, indexOptions);

        // search by text
        app.get('/collegeName/:text', async (req, res) => {
            const text = req.params.text;
            const result = await collegesCollection
                .find({
                    $or: [
                        { collegeName: { $regex: text, $options: "i" } },
                    ],
                }).toArray();
            res.send(result)
        })

        // post a user
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                console.log('User already exists');
                return res.send({ message: 'User already exists' });
            }
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        // get research paper
        app.get('/research', async (req, res) => {
            const result = await collegesCollection.find().toArray();
            res.send(result);
        })

        // get colleges
        app.get('/colleges', async (req, res) => {
            const result = await collegesCollection.find().toArray();
            res.send(result);
        })

        // get colleges details
        app.get('/collegesdetails/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await collegesCollection.findOne(query);
            res.send(result);
            console.log(result)
        })

        // get popular colleges
        app.get('/popularcolleges', async (req, res) => {
            const result = await collegesCollection.find().limit(3).toArray();
            res.send(result);
        })

        // get popular colleges details
        app.get('/popularcolleges/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await collegesCollection.findOne(query);
            res.send(result);
            console.log(result)
        })

        // for admission form
        app.get('/admission/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await collegesCollection.findOne(query);
            res.send(result);
            console.log(result)
        })

        // for get review from admission collection
        app.get('/reviews', async (req, res) => {
            const result = await admissionCollection.find().toArray();
            res.send(result);
        })

        // post the admission form in collection
        app.post('/collegeadmission', async (req, res) => {

            const admissionForm = req.body;

            // Check if the candidateEmail already exists in the collection
            const existingForm = await admissionCollection.findOne({ userEmail: admissionForm.userEmail });

            if (existingForm) {
                // If the email already exists, send an error response
                console.log('Candidate email already exists.');
                toast.error('Candidate email already exists.');
                // res.status().json({ error: 'Candidate already applied, so email already exists.' });
                return res.send({ message: 'Candidate already applied, so email already exists.' });
            }

            const result = await admissionCollection.insertOne(admissionForm);
            console.log(result);
            res.send(result);
        })

        // get the admission form of eash user
        app.get('/mycollege/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            console.log(query);
            const result = await admissionCollection.findOne(query);
            // console.log(result);
            res.send(result);
        })


        // for put : update the feedback in a modal
        app.put('/mycollege/feedback/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const collegeInfo = req.body;
            const options = { upsert: true }
            console.log(collegeInfo);
            const updateFeedback = {
                $set: {
                    feedback: collegeInfo.feedback,
                    ratings: collegeInfo.ratings
                }
            };
            const result = await admissionCollection.updateOne(query, updateFeedback, options);
            res.send(result);
        })

        // profile
        app.get('/profile/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            console.log(query);
            const result = await admissionCollection.find(query).toArray();
            // console.log(result);
            res.send(result);
        })

        // profile
        app.get('/profiles/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await admissionCollection.findOne(query);
            // console.log(result);
            res.send(result);
        })

        // update profile
        app.put('/updateprofile/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateprofile = {
                $set: {
                    candidateName: body.candidateName,
                    candidateEmail: body.candidateEmail,
                    candidatecollegeName: body.candidatecollegeName,
                    candidateAddress: body.candidateAddress
                }
            };
            const result = await admissionCollection.updateOne(filter, updateprofile);
            res.send(result);
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// test
app.get('/', (req, res) => {
    res.send('CollegeGenius is running now successfully')
})

app.listen(port, () => {
    console.log(`CollegeGenius running on port ${port}`);
})
