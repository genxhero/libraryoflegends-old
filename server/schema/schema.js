const graphql = require('graphql');

const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLInt,
   GraphQLList,
   GraphQLSchema,
   GraphQLNonNull
} = graphql;
const RootQuery = require('./root_query_type');
const mutations = require("./mutations");
const subscriptions = require('./subscription_type');


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutations,
  subscription: subscriptions
});