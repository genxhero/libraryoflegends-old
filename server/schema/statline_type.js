const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const StatLine = new GraphQLObjectType({
  name: 'StatLine',
  fields: {
    strength: { type: GraphQLInt },
    dexterity: { type: GraphQLInt },
    constitution: { type: GraphQLInt },
    intelligence: { type: GraphQLInt },
    wisdom: { type: GraphQLInt },
    charisma: { type: GraphQLInt }
  }
});

module.exports = StatLine;