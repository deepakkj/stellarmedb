const jsonServer = require("json-server");
const server = jsonServer.create();
// if (process.env.stellarNWType === 'testnet') {
//     const router = jsonServer.router('db-test.json')
// } else {
// }
const router = jsonServer.router(
  process.env.stellarNWType === "mainnet" ? "db.json" : "db-test.json"
);

const middlewares = jsonServer.defaults();
console.log(process.env.stellarNWType);
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
// server.get('/echo', (req, res) => {
//     res.jsonp(req.query)
// })

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST" || req.method === "GET") {
    req.body.createdAt = Date.now();
    // Continue to JSON Server router
    next();
  } else {
    res.sendStatus(401);
  }
});

// Use default router
server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running on http://localhost:4000/");
});
