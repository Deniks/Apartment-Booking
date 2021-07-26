import { ApolloClient } from 'apollo-client';
import { split, ApolloLink, concat } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';

const SERVER = 'http://localhost:4020/graphql';
const WEB_SOCKET_LINK = 'ws://localhost:4020/graphql';

const httpLink = new HttpLink({
  fetch,
  uri: SERVER,
});

const webSocketLink = new WebSocketLink({
  uri: WEB_SOCKET_LINK,
  options: {
    reconnect: true,
  },
});

/**
 * Get Token & Set Token In Request
 */

/**
 * Destroy Token
 * For logout purpose
 */

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  httpLink
);

const client = new ApolloClient({
  link: concat(link),
  cache: new InMemoryCache().restore({}),
  connectToDevTools: true,
});

export default client;
