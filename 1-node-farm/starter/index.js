const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
//Bloching synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log("Reading file ...", textIn);
// const textOut = `This is what we we about avocado: ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("Writing file ...");
// console.log(fs.readFileSync("./txt/output.txt", "UTF-8"));

//Non-blocking asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) return console.log("ERROR");
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err2, data2) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err3, data3) => {
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written.");
//       });
//     });
//   });
// });
// console.log("read this first");

////////////////////////
//Reading and saving files
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

//// SERVER SETUP
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  }
  //PRODUCT
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>PAGE NOT FOUND</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on post 8000");
});
