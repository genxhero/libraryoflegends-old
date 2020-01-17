const graphql = require("graphql");
const CharType =require("./char_type");
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const SubscriptionType = new GraphQLObjectType({ 
    name: "SubscriptionType",
    fields: () => ({ 
        charAdded: {
            type: CharType,
            args: {repoFullName: {type: GraphQLString}},
            resolve: (payload) => {
              console.log("payload = ", payload)
                return {
                  customData: payload,
                };
              },
            subscribe: () => pubsub.asyncIterator('charAdded')
        }
    })
})

module.exports = SubscriptionType;