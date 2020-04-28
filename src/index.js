const { GraphQLServer } = require('graphql-yoga');


// dummy data
let links = [
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
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find(linkById => linkById.id === args.id)
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      if (args.url || args.description) {
        const linkIndex = links.findIndex(linkById => linkById.id === args.id);

        if (linkIndex > -1) {
          const { url, description, ...remainder } = links[linkIndex];
          const newLinkById = {
            ...remainder,
            url: args.url ? args.url : url,
            description: args.description ? args.description : description
          };
          links[linkIndex] = newLinkById;
          return newLinkById;
        }
      }
      return links;
    },
    deleteLink: (parent, args) => {
      const linkIndex = links.findIndex(linkById => linkById.id === args.id);

      if (linkIndex > -1) {
        const removedLink = links[linkIndex];
        const filteredLinks = links.filter(linkById => linkById.id !== args.id);
        links = filteredLinks;
        return removedLink;
      }
      return links;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));
