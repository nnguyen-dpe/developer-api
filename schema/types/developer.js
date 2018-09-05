const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'DeveloperType',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        team: { type: GraphQLString },
        skills: {
            type: new GraphQLList(GraphQLString)
        }
    }
});