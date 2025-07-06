import weaviate, { ApiKey } from 'weaviate-client';

export const client = await weaviate.connectToCustom({
  httpHost: 'localhost',
  httpPort: 8081,
  httpSecure: false,
  grpcHost: 'localhost',
  grpcPort: 50051,
  grpcSecure: false
});
