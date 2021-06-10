import {ApolloServer} from 'apollo-server-micro';
import {typeDefs} from '../../apollo/Types';
import {resolvers} from '../../apollo/Resolver';
import database from '../../middlewares/mongodb.middleware';

console.log("====================",process.env.MONGO_URI);

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = apolloServer.createHandler({
    path: '/api/graphql'
});



export default database(handler);

export const config = {
    api: {
        bodyParser: false
    }
}