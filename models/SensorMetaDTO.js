class SensorMetaDTO {
    constructor(id, createTime, sensorId, description, iconSvg) {
      this.id = id;
      this.createTime = createTime;
      this.sensorId = sensorId;
      this.description = description;
      this.iconSvg = iconSvg;
    }
  }
  
  module.exports = SensorMetaDTO;