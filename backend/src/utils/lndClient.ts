// lndClient.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Path to your lightning.proto file
const PROTO_PATH = './protos/lightning.proto';

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const lnrpcDescriptor = grpc.loadPackageDefinition(packageDefinition);
const lnrpc = (lnrpcDescriptor as any).lnrpc;

// Create and export the gRPC client
export const lndClient = new lnrpc.Lightning('localhost:10009', grpc.credentials.createInsecure());

// Replace 'localhost:10009' with your LND node's address and port
// For production, use secure credentials
