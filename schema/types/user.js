const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = require('graphql');

const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
const ContestType = require('./contest');

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        createdAt: {
            type: GraphQLString
        },
        contests: {
            type: new GraphQLList(ContestType),
            resolve(obj, args, { pgPool }) {
                // read from database
                return pgdb(pgPool).getContests(obj);
            }
        },
        contestsCount: {
            type: GraphQLInt,
            resolve(obj, args, { mPool }, { fieldName }) {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(obj, args, { mPool }, { fieldName }) {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(obj, args, { mPool }, { fieldName }) {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        }
    }
});