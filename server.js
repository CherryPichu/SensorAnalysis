const express = require('express');
const SensorMeta = require('./models/SensorMetaDAO.js');
const Sensor = require('./models/SensorDAO.js');
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
        const sensor = new Sensor()
        sensor.findAll().then((result2) => {
            res.send( result2);
        })
    })
})



module.exports = server;