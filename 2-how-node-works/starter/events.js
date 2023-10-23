const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("NEW SALE");
});

myEmitter.on("newSale", () => {
  console.log("Customer Name Angel");
});

myEmitter.on("newSale", (stock) => {
  console.log(`there are now ${stock} items left`);
});

myEmitter.emit("newSale", 9);

/////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("req received");
  res.end("req received");
});
server.on("request", (req, res) => {
  console.log("req2 received");
});
server.on("close", () => {
  console.log("close");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to port 8000");
});
