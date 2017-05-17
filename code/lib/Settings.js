class Settings {
  constructor() {



    const fs = require('fs');

    const userCfgPath = '../data/userCfg.json';
    const userCfgExists = fs.existsSync(userCfgPath);

    let userCfg = { modules: {}};

    if(userCfgExists) {
      userCfg = require('../'+userCfgPath);
    }

    //General
    this.DEBUG_LEVEL = 'debug';
    this.DEBUG_EVENTS = false;

    this.modules = {
      DISPLAY: userCfg.modules.DISPLAY || 'WEB',
      INPUT: userCfg.modules.INPUT || 'NONE',
      INFRARED: userCfg.modules.INFRARED || 'WSFAKE',
      LED: userCfg.modules.LED || 'MOCK',
      RUMBLE: userCfg.modules.RUMBLE || 'MOCK',
      SOUND: userCfg.modules.SOUND || 'LOCAL'
    };

    this.WEBSERVER_PORT = 3000;

    this.WS2812_CFG = {
      BRIGHTNESS: 255,
      MUZZLE_FLASH_LEDS: [0],
      MUZZLE_FLASH_COLOR_ON: '0x00FF00',
      MUZZLE_FLASH_COLOR_OFF: '0x000000',
      HIT_LEDS: [1,2],
      TEAM_COLORS: {
        green: '0xFF0000',
        red: '0x00FF00',
        blue: '0x0000FF',
        yellow: '0xFFFF00'
      }
    };

    this.SSD1306_CFG = {
      width: 128,
      height: 64,
      address: 0x3C
    };

    this.RUMBLE_MOTOR_CFG = {
      PIN: 21
    };

    // for the gpio input module
    this.GPIO_INPUT_CFG = {
      TRIGGER_GPIO: 11,
      RELOAD_GPIO: 5,
      UP_GPIO: 6,
      DOWN_GPIO: 13,
      FUNC1_GPIO: 19,
      FUNC2_GPIO: 26
    }
  }
}

module.exports = new Settings();
