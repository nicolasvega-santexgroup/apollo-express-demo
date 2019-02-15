const { MongoClient } = require('mongodb');
const assert = require('assert');
const { nodeEnv } = require('../lib/util');
const mongoConfig = require('../config/mongo')[nodeEnv];
const uuidv4 = require('uuid/v4');


MongoClient.connect(mongoConfig.url, (err, db) => {
    assert.equal(null, err);

    db.collection('users').insertMany([
        {
            id: 1,
            name: "Nico V"
        },
        {
            id: 2,
            name: "JP Chupete"
        },
        {
            id: 3,
            name: "Pablo B"
        },
        {
            id: 4,
            name: "Pedro F"
        },
        {
            id: 5,
            name: "Martin S"
        }
    ]).then(response => {
        console.log(response);
        db.close();
    });
});

