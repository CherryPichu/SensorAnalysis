const dbConn = require('./db.js');
const SensorMetaDTO = require('./SensorMetaDTO.js');
class SensorMetaDAO {
    constructor() {
      this.db = dbConn;
    }
  
    create(sensorId, description) {
      const sql = `INSERT INTO SensorMeta (Sesnsorid, description) VALUES (?, ?)`;
      const values = [sensorId, description];
      return new Promise((resolve, reject) => {
        this.db.run(sql, values, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(new SensorMetaDTO(this.lastID, null, sensorId, description));
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
            resolve(new SensorMetaDTO(row.id, row.CreateTime, row.Sesnsorid, row.description));
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
            const sensorMetaList = rows.map(row => new SensorMetaDTO(row.id, row.CreateTime, row.Sesnsorid, row.description));
            resolve(sensorMetaList);
          }
        });
      });
    }
  
    update(sensorMetaDTO) {
      const sql = `UPDATE SensorMeta SET Sesnsorid = ?, description = ? WHERE id = ?`;
      const values = [sensorMetaDTO.sensorId, sensorMetaDTO.description, sensorMetaDTO.id];
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