// Import type helpers from graphql-js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql')

const api = require('../api/developer');
const pgdb = require('../database/pgdb');
const UserType = require('./types/user');
const DeveloperType = require('./types/developer');

// the root query type is where in the data graph we can start asking questions
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'This is *mandatory* string',
            resolve: () => 'world'
        },
        me: {
            type: UserType,
            description: 'The current user identified by an api key',
            args: {
                key: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (obj, args, { pgPool }) => {
                console.log(args.key);
                return pgdb(pgPool).getUserByApiKey(args.key);
            }
        },
        developers: {
            type: new GraphQLList(DeveloperType),
            description: 'Developer collection',
            resolve: (obj, args, { url }) => {
                console.log('Load developers');
                return api.getAllDevelopers();
            }
        }
    }
});

// define schema
const ncSchema = new GraphQLSchema({
    query: RootQueryType
    //mutation: ...
});

module.exports = ncSchema;