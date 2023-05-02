const express = require('express');
const SensorMeta = require('./models/SensorMetaDAO.js');
const port = process.env.PORT || 8080;

const server = express();

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
})

/**
 * SensorMeta의 findAll()을 호출하여 결과를 JSON으로 반환한다.
 */
server.get('/', (req, res) => {
    const senMeta  = new SensorMeta()
    senMeta.findAll().then((result) => {
        res.json( result );
    })
   
})


module.exports = server;