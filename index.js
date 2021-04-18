const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const redirUrl = require('./routes/index');
const schema = require('./schema/schema');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

dotenv.config();
const app = express();

// Connect to database
connectDB();

app.use(express.json({ extented: false }));
app.use(cors());

// Routes
app.use('/', redirUrl); // Put the short url to redirect to the initial url

app.use(
  "/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`)); 

module.exports = app;