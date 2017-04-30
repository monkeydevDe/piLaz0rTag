class Settings {
  constructor() {



    const fs = require('fs');

    const userCfgPath = '../data/userCfg.json';
    const userCfgExists = fs.existsSync(userCfgPath);

    let userCfg = {};

    if(userCfgExists) {
      userCfg = require('../'+userCfgPath);
    }

    console.error(userCfg.modules);
    



    //General
    this.DEBUG_LEVEL = 'debug';
    this.DEBUG_EVENTS = false;

    this.modules = {
      DISPLAY: userCfg.modules.DISPLAY || 'WEB',
      INPUT: userCfg.modules.INPUT || 'WEB',
      INFRARED: userCfg.modules.INFRARED || 'WSFAKE',
      LED: userCfg.modules.LED || 'MOCK',
      RUMBLE: userCfg.modules.RUMBLE || 'MOCK',
      SOUND: userCfg.modules.SOUND || 'LOCAL'
    };

    this.WEBSERVER_PORT = 3000;
    this.WS2812_CFG = {
      HOST: '127.0.0.1',
      PORT: 6969,
      BRIGHTNESS: 255,
      MUZZLE_FLASH_LEDS: [0],
      MUZZLE_FLASH_COLOR_ON: '0x00FF00',
      MUZZLE_FLASH_COLOR_OFF: '0x000000',
      HIT_LEDS: [1],
      TEAM_COLORS: {
        green: '0xFF0000',
        red: '0x00FF00',
        blue: '0x0000FF',
        yellow: '0xFFFF00'
      }
    };
    this.RUMBLE_MOTOR_CFG = {
      PIN: 24
    }
  }
}

module.exports = new Settings();




