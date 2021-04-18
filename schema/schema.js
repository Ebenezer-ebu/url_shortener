const graphql = require("graphql");
const Url = require("../models/url");

const getShortenURL = require("../controller/shortenUrl");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull} = graphql;

// Url Type
const UrlType = new GraphQLObjectType({
    name: "Url",
    description: "Url fields defined",
    fields: () => ({ 
        shortUrl: {
            type: GraphQLString,
            description: "Shorten url"
        }
    })
})

// Query Type
const queryType = new GraphQLObjectType({
  name: "shortenURL",
  fields: () => ({
    url: {
      type: UrlType,
      // args describes the arguments that the getShortenUrl accepts
      args: {
        longUrl: {
          type: new GraphQLNonNull(GraphQLString),
          description: "Valid long url to shorten",
        }
      },
      resolve: (parent, args) => {
        return getShortenURL(args);
      },
    },
  }),
});

const schema = new GraphQLSchema({ query: queryType });

module.exports = schema;
 