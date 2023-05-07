const express = require('express');
const port = process.env.PORT || 8080;
const viewRouter = require('./routers/view.js');

const server = express();



// view에 대한 라우터를 등록한다.
server.use('/view', viewRouter)

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
})



module.exports = server;