require('dotenv').config();
const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require('./schema/schema');
const passport = require("passport");
const session = require("express-session");
const db = require('../config/keys').mongoURI;
const secretOrKey = require('../config/keys').secretOrPrivateKey;
const MongoStore = require('connect-mongo')(session);
const passportConfig = require('./services/auth');
const cors = require('cors');
const { execute, subscribe } =require('graphql');
const {createServer} = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { PubSub } = require('graphql-subscriptions');

require('../config/passport');

const app = express();
const PORT = process.env.PORT || 8000
//

mongoose.Promise = global.Promise;
mongoose.connect(db);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));


    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: "whatever",
        store: new MongoStore({
          url: db,
          autoReconnect: true,
          mongooseConnection: mongoose.connection
        })
      }));

app.use(bodyParser.json());
app.use(cors('*'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

const pubsub = new PubSub();
const server = createServer(app);

// comment this out if it breaks again
server.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server: server,
      path: '/subscriptions',
    });
});

module.exports = app;
