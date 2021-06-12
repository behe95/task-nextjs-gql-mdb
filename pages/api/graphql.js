import {ApolloServer} from 'apollo-server-micro';
import {typeDefs} from '../../apollo/Types';
import {resolvers} from '../../apollo/Resolver';
import database from '../../middlewares/mongodb.middleware';
import getErrorCode from '../../utils/apollo/getErrorCode';


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: err => {

        if (err.message.startsWith('CUSTOM_ERR_')) {
            const error = getErrorCode(err.message);
            return ({
                message: error.message,
                statusCode: error.statusCode
            })            
        }

        console.log(err);

        return err;
    }
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