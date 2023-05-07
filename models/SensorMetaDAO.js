const dbConn = require('./db.js');
const SensorMetaDTO = require('./SensorMetaDTO.js');
class SensorMetaDAO {
    constructor() {
      this.db = dbConn;
    }
  
    create(sensorId, description, iconSvg) {
      const sql = `INSERT INTO SensorMeta (Sensorid, description, iconSvg) VALUES (?, ?, ?)`;
      const values = [sensorId, description, iconSvg];
      return new Promise((resolve, reject) => {
        this.db.run(sql, values, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(new SensorMetaDTO(null, null, sensorId, description, iconSvg));
          }
        });
      });
    }
  
    findById(id) {
      const sql = `SELECT * FROM SensorMeta WHERE id = ?`;
      const values = [id];
      return new Promise((resolve, reject) => {
        this.db.get(sql, values, function(err, row) {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(new SensorMetaDTO(row.id, row.CreateTime, row.sensorId, row.description, row.iconSvg));
          } else {
            resolve(null);
          }
        });
      });
    }
  
    findAll() {
      const sql = `SELECT * FROM SensorMeta`;
      return new Promise((resolve, reject) => {
        this.db.all(sql, function(err, rows) {
          if (err) {
            reject(err);
          } else {
            const sensorMetaList = rows.map(row => new SensorMetaDTO(row.id, row.CreateTime, row.sensorId, row.description, row.iconSvg));
            resolve(sensorMetaList);
          }
        });
      });
    }

    findBySensorId(id) {
      const sql = `SELECT * FROM SensorMeta WHERE sensorId = ?`;
      const values = [id];
      return new Promise((resolve, reject) => {
        this.db.get(sql, values, function(err, row) {
          if (err) {
            reject(err);
          } else if (row) {
              resolve(new SensorMetaDTO(row.id, row.CreateTime, row.sensorId, row.description, row.iconSvg))
          } else {
            resolve(null);
          }
        });
      });
    }
  
    update(sensorMetaDTO) {
      const sql = `UPDATE SensorMeta SET Sensorid = ?, description = ? WHERE id = ?`;
      const values = [sensorMetaDTO.sensorId, sensorMetaDTO.description, sensorMetaDTO.id, sensorMetaDTO.iconSvg];
      return new Promise((resolve, reject) => {
        this.db.run(sql, values, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(sensorMetaDTO);
          }
        });
      });
    }
  
    delete(id) {
      const sql = `DELETE FROM SensorMeta WHERE id = ?`;
      const values = [id];
      return new Promise((resolve, reject) => {
        this.db.run(sql, values, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  
    close() {
      this.db.close();
    }
  }

module.exports = SensorMetaDAO;