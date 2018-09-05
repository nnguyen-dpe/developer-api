const express = require('express');
const graphqlHTTP = require('express-graphql');

// dev environment
const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);


// pg database
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);

// mongo database
const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

// graphql schema
const ncSchema = require('../schema');
const app = express();

MongoClient.connect(mConfig.url, (err, mPool) => {
    assert.equal(err, null);
    // init endpoint
    app.use('/graphql', graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: { pgPool, mPool }
    }), () => {
        console.log('GraphqlHTTP loaded');
    });

    app.get('/hello', (req, res) => res.send('Hi, how are u'));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});