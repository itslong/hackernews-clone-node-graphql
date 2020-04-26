const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;

// dummy data
const links = [
  {
    id: 'link-0',
    url: 'www.link0.com',
    description: 'some link'
  },
  {
    id: 'link-1',
    url: 'www.anotherlink.com',
    description: 'more links'
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));
