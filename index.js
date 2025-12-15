const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const restRoutes = require('./routes/rest');
const { typeDefs, resolvers } = require('./graphql/schema');
const { connect } = require('./db');
const { port } = require('./config');

async function start() {
  await connect();

  const app = express();
  app.use(express.json());
  app.use('/api', restRoutes);

  const apollo = new ApolloServer({ typeDefs, resolvers });
  await apollo.start();
  apollo.applyMiddleware({ app, path: '/graphql' });

  app.get('/', (req, res) => res.send('AcadTrack backend running'));

  const server = http.createServer(app);
  server.listen(port, () => console.log(`Server listening on port ${port}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
