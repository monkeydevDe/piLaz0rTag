//get the default values
var std = require('./standards.js');
module.exports = {
  //General
  DEBUG_LEVEL: 'debug',
  DEBUG_EVENTS: false,
  DISPLAY: std.DISPLAY_TYPE.WEB,
  INPUT: std.INPUT_TYPE.WEB,
  INFRARED: std.INFRARED_TYPE.IRWSFAKE,
  LED: std.LED_TYPE.MOCK,
  //this.DISPLAY = DISPLAY_TYPE.SSD1306I2C;
  //Display settings
  DISPLAY_LAYOUT: 0,
  WEBSERVER_PORT: std.WEBSERVERCONF.PORT,
  WS2812_CFG : {
    HOST: '127.0.0.1',
    PORT: 6969,
    BRIGHTNESS: 255,
    MUZZLE_FLASH_LEDS : [0],
    MUZZLE_FLASH_COLOR : '0xFF0000',
    HIT_LEDS : [1],
    TEAM_COLORS: {
      green: '0x00FF00',
      red: '0xFF0000',
      blue: '0x0000FF',
      yellow: '0xFFFF00'
    }
  }
};