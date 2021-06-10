import {ApolloServer} from 'apollo-server-micro';
import {typeDefs} from '../../apollo/Types';
import {resolvers} from '../../apollo/Resolver';


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = apolloServer.createHandler({
    path: '/api/graphql'
});

export default handler;

export const config = {
    api: {
        bodyParser: false
    }
}