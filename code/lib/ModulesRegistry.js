/**
 * This is the registry of the modules where it will load all the modules which are configured.
 */

const {BaseClass} = require('./BaseClass');

class ModulesRegistry extends BaseClass {

  constructor() {
    super();

    this.settings = require('../modules/settings');

    this.modules = {};

    this.modulesCfg = [
      {
        name : 'rumble',
        settingsPreFix: 'RUMBLE',
        types: {
          MOTOR: 'MotorRumbleHandler', // when to use a motor as a rumble device
          WEB: 'WebSocketRumbleHandler', // when to use mobile vibrating api
          MOCK: 'MockRumbleHandler' // Mock for rumble
        }
      },{
        name : 'leds',
        settingsPreFix: 'LED',
        types: {
          MOCK : 'MockLedHandler', //default Type of led for testing purpose
          WS2812 : 'WS2812LedHandler', // ws2812 led
        }
      },{
        name : 'infrared',
        settingsPreFix: 'INFRARED',
        types: {
          LIRCD : 'LircdInfraredHandler', // when the input comes from the keyboard
          IRMOCK : 'IrMockHandler', // Mock of LIRC Deamon
          WSFAKE : 'FakeWebsocketIrHandler' // Websocket ir handler where you can send receive ir messages over web for DEV.
        }
      },{
        name : 'input',
        settingsPreFix: 'INPUT',
        types: {
          WEB : 'WebInputHandler', // handle input over a websocket
          KEYBOARD : 'KeyboardInputHandler' // when the input comes from the keyboard
        }
      },{
        name : 'display',
        settingsPreFix: 'DISPLAY',
        types: {
          WEB : 'WebSocketDisplay', // handle input over a websocket
        }
      }
    ];

    for(let moduleIdx in this.modulesCfg) {
      const module = this.modulesCfg[moduleIdx];
      this.log.info('ModulesRegistry: going to load module: ' + module.name);
      this._loadModule(module);
    }
  }

  /**
   * Actually tries to load a configured module by its implementation.
   * @param moduleCfg
   * @private
   */
  _loadModule(moduleCfg) {

    const configuredType = this.settings[moduleCfg.settingsPreFix];

    this.log.info('ModulesRegistry: Module: ' + moduleCfg.name + ' is configured with the type: ' + configuredType);

    const classToLoad = moduleCfg.types[configuredType];

    if(classToLoad === undefined) {
      throw new Error('ModulesRegistry: no type or not avaible for: ' + moduleCfg.name + ' ' + configuredType);
    }

    const pathToRequire = '../modules/'+moduleCfg.name+'/'+classToLoad;
    this.log.debug('ModulesRegistry: Loading from file: '+pathToRequire);

    this.modules[moduleCfg.name] = require('../modules/'+moduleCfg.name+'/'+classToLoad);

  }

}

module.exports.ModulesRegistry = new ModulesRegistry();