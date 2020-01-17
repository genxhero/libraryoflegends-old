const graphql = require('graphql');
const axios = require('axios');
const mongoose = require("mongoose");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql;

const User = require('../models/user');
const Char = require('../models/character');
const StatLine = require('./statline_type');


const CharType = new GraphQLObjectType({
    name: "Character",
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        class: { type: GraphQLString },
        ancestry:{ type: GraphQLString },
        background: {type: GraphQLString},
        level: { type: GraphQLInt },
        statline: { type: StatLine },
        bio: {type: GraphQLString},
        age: {type: GraphQLInt},
        user: {
            type: require('./user_type'),
            resolve(parentValue) {
                return Char.findById(parentValue).populate('user')
                .then(char => {
                    console.log(char);
                     return char.user;
                });
            }
        },
        image: {type: GraphQLString }
    })
});


module.exports = CharType;