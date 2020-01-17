const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;
const CharType = require('./char_type');
const User = require('../models/user');
const Char = require('../models/character');



const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: {type: GraphQLString},
        bio: {type: GraphQLString},
        characters: {
            type: new GraphQLList(CharType),
            resolve(parentValue, args) {
               return User.findChars(parentValue.id);
            }
        }
    })
});

module.exports = UserType;