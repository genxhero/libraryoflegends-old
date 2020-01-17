const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;

const s3Payload = new GraphQLObjectType({ 
    name: "s3Payload",
    fields: () => ({ 
       signedRequest: {type: GraphQLString},
       url: {type: GraphQLString}
    })
});

module.exports = s3Payload;
