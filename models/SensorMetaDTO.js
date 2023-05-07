class SensorMetaDTO {
    constructor(id, createTime, sensorId, title, description, iconSvg) {
      this.id = id;
      this.createTime = createTime;
      this.sensorId = sensorId;
      this.description = description;
      this.iconSvg = iconSvg;
      this.title = title;
    }
  }
  
  module.exports = SensorMetaDTO;