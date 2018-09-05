const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} = require('graphql');

const pgdb = require('../../database/pgdb');


module.exports = new GraphQLObjectType({
    name: 'Name',
    fields: () => {
        const UserType = require('./user');
        console.log(UserType);
        return {
            id: { type: GraphQLID },
            label: { type: GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLString },
            createdAt: { type: GraphQLNonNull(GraphQLString) },
            createdBy: {
                type: UserType,
                resolve(obj, args, { pgPool }) {
                    return pgdb(pgPool).getUserById(obj.id);
                }
            }
        };
    }
});