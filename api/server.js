// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();

const postsRouter = require ('./posts/posts-router');

server.use(express.json());

server.use('/api/posts', postsRouter);



// OTHER ENDPOINTS
server.get('/', (req, res) => {
    res.send(`
     Hi there!
    `);
  });
  