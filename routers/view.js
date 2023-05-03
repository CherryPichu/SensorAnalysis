const router = require('express').Router();
const SensorMeta = require('../models/SensorMetaDAO.js');
const Sensor = require('../models/SensorDAO.js');
/*
등록된 모든 센서 정보에 대한 JSON을 반환한다.
example:
{
    "sensorId": {
        "id": 1,
        "sensorId": "sensor1",
        "CreateTime" :  "2020-01-01 00:00:00",
        "description": "센서1입니다.",
         "SensorData": [1,2,3,2.2, 3.1, 2.1],
         "timestamp":[1683136544000]
    },
    "sensorId": {
        "id": 2,
        "sensorId": "sensor2",
        "CreateTime" :  "2020-01-01 00:00:00",
        "description": "센서2입니다.",
        "SensorData": [1,2,3,2.2, 3.1, 2.1],
         "timestamp":[1683136544000]
    },
}
*/
/**
 * SensorMeta의 findAll()을 호출하여 결과를 JSON으로 반환한다.
 */
router.get('/', async (req, res) => {
    const snmtDtbs  = new SensorMeta()
    /*
    DB에 있으면 :
    SensorMetaDTO {
        id: 1,
        createTime: '2023-05-02 16:59:50',
        sensorId: 'sqlite',
        description: 'dfsefe'
    }
    */
    await snmtDtbs.findAll().then(async (snmtD) => { // snmtD : sensorMetaData
        const snDtbs = new Sensor()
        for(let i = 0; i < snmtD.length; i++) {

            /*
            DB에 있으면 :
                SensorDTO {
                id: 1,
                sensorId: 'sqlite',
                value: 1,
                createAt: 1683136544000,
                hash: null
                }
            DB에 없으면 :
                null
            */
            await snDtbs.findBySensorId(snmtD[i]['sensorId']).then((snD) => {
                // console.log(snD)
                // console.log(snD['value'])
                let valList =  snD.map((data) => { return data['value'] });
                let creatAtList =  snD.map((data) => { return data['createAt'] });

                if(snD == null) { // 데이터가 없다면
                    snmtD[i]['SensorData'] = valList;
                    return; // 종료
                }

                
                snmtD[i]['SensorData'] = valList;
                snmtD[i]['timestamp'] = creatAtList;
            })
        }

        
        res.send(snmtD)
    })
})

router.get('/getSesnor/:sensorId', async (req, res) => {
    const snmtDtbs  = new SensorMeta()
    /*
    DB에 있으면 :
    SensorMetaDTO {
        id: 1,
        createTime: '2023-05-02 16:59:50',
        sensorId: 'sqlite',
        description: 'dfsefe'
    }
    */


})

            

module.exports = router;