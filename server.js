const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("list.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const listPackage = grpcObject.listPackage;

 
const server = new grpc.Server();
server.bind("0.0.0.0:40000",
 grpc.ServerCredentials.createInsecure());

server.addService(listPackage.List.service,
    {
        "createList": createList,
        "readList" : readList,
        "readListStream": readListStream
    });
server.start();

const lists = []
function createList (call, callback) {

    const listItem = {
        "id": lists.length + 1,
        "name": call.request.name
    }
    lists.push(call.request)    
    callback(null, listItem);
}

function readList (call, callback) {
    callback(null, {"items": lists})
    
}

function readListStream( call, callback){
    lists.forEach(l => call.write(l));
    call.end();
    
}