class SensorMetaDTO {
    constructor(id, createTime, sensorId, description) {
      this.id = id;
      this.createTime = createTime;
      this.sensorId = sensorId;
      this.description = description;
    }
  }
  
  module.exports = SensorMetaDTO;