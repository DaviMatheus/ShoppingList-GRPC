const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("list.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);
const listPackage = grpcObject.listPackage;

const name = process.argv[2];

const client = new listPackage.List("localhost:40000", grpc.credentials.createInsecure())

client.createList({
    "id": -1,
    "name": name
}, (err, response) => {

    console.log("Recieved from server" + JSON.stringify(response))
})



const call = client.readListStream();
call.on("data", item => {
    console.log("received item from server" + JSON.stringify(item))
})


call.on("end", e => console.log("server done"));