const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(cors({
  origin: 'http://localhost:3000', // Ajusta el origen según tu entorno de desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
