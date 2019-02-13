const { MongoClient } = require('mongodb');
const assert = require('assert');
const { nodeEnv } = require('../lib/util');
const mongoConfig = require('../config/mongo')[nodeEnv];
const uuidv4 = require('uuid/v4');


const id89 = uuidv4(89);
const id97 = uuidv4(97);


MongoClient.connect(mongoConfig.url, (err, db) => {
    assert.equal(null, err);

    db.collection('games').insertMany([
        {
            id: uuidv4(1),
            creator: {
                id: id89,
                name: 'Nico V'
            },
            status: 'new',
            opponent: null,
            createdAt: '2/9/2019 5:45 pm'
        },
        {
            id: uuidv4(2),
            creator: {
                id: id89,
                name: 'Nico V'
            },
            status: 'deleted',
            opponent: null,
            createdAt: '2/9/2019 5:47 pm'
        },
        {
            id: uuidv4(3),
            creator: {
                id: id89,
                name: 'Nico V'
            },
            status: 'accepted',
            opponent: {
                id: id97,
                name: 'Abril S'
            },
            createdAt: '2/9/2019 5:49 pm'
        },
        {
            id: uuidv4(4),
            creator: {
                id: id89,
                name: 'Nico V'
            },
            status: 'in progress',
            opponent: {
                id: id97,
                name: 'Abril S'
            },
            createdAt: '2/9/2019 5:51 pm'
        },
        {
            id: uuidv4(5),
            creator: {
                id: id89,
                name: 'Nico V'
            },
            status: 'finished',
            opponent: {
                id: id97,
                name: 'Abril S'
            },
            createdAt: '2/9/2019 5:55 pm'
        }
    ]).then(response => {
        console.log(response);
        db.close();
    });
});

