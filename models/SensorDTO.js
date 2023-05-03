class SensorDTO {
    constructor(id, sensorId, value, createAt, hash) {
      this.id = id;
      this.sensorId = sensorId;
      this.value = value;
      this.createAt = createAt;
      this.hash = hash;
    }
  }
  
  module.exports = SensorDTO;