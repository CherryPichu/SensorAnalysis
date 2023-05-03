const SensorDTO = require('./SensorDTO');
const dbConn = require('./db.js');

class SensorDAO {
  constructor() {
    this.db = dbConn
  }

  create(sensorId, value, createAt, hash) {
    const sql = `INSERT INTO Sensor (sensorId, value, createAt, hash) VALUES (?, ?, ?, ?)`;
    const values = [sensorId, value, createAt, hash];
    return new Promise((resolve, reject) => {
      this.db.run(sql, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(new SensorDTO(this.lastID, sensorId, value, createAt, hash));
        }
      });
    });
  }

  findById(id) {
    const sql = `SELECT * FROM Sensor WHERE id = ?`;
    const values = [id];
    return new Promise((resolve, reject) => {
      this.db.get(sql, values, function(err, row) {
        if (err) {
          reject(err);
        } else if (row) {
          resolve(new SensorDTO(row.id, row.sensorId, row.value, row.createAt, row.hash));
        } else {
          resolve(null);
        }
      });
    });
  }

  findAll() {
    const sql = `SELECT * FROM Sensor`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, function(err, rows) {
        if (err) {
          reject(err);
        } else {
          const sensorList = rows.map(row => new SensorDTO(row.id, row.sensorId, row.value, row.createAt, row.hash));
          resolve(sensorList);
        }
      });
    });
  }

  update(sensorDTO) {
    const sql = `UPDATE Sensor SET sensorId = ?, value = ?, createAt = ?, hash = ? WHERE id = ?`;
    const values = [sensorDTO.sensorId, sensorDTO.value, sensorDTO.createAt, sensorDTO.hash, sensorDTO.id];
    return new Promise((resolve, reject) => {
      this.db.run(sql, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(sensorDTO);
        }
      });
    });
  }

  delete(id) {
    const sql = `DELETE FROM Sensor WHERE id = ?`;
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

module.exports = SensorDAO;