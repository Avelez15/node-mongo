const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

//below allows for connection to MongoDB server, client object allows us to access nucampsite db.
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    //below code block dropped campsites collection from database, recreated it, then added a new doc
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites'); //connection to db for tis function

        //allows for insertion of new document
        collection.insertOne({ name: 'Breadcrumb Trail Campground', description: 'Test' },
            (err, result) => {
                assert.strictEqual(err, null);
                console.log('Insert Document:', result.ops);

                //below allows for finding of all the documents and then turn them to an array, then console.logging it.
                collection.find().toArray((err, docs) => {
                    assert.strictEqual(err, null);
                    console.log('Found documents:', docs);

                    client.close();//closes client connection to server
                });

            });
    });
});