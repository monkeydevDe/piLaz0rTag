/**
 * This is the registry of the modules where it will load all the modules which are configured.
 */

const { BaseClass } = require('./BaseClass');
const { ModuleCfg } = require('./ModuleCfg');

class ModulesRegistry extends BaseClass {

  constructor() {
    super();

    this.modules = {};

    this.modulesCfg = [
      {
        name : 'rumble',
        settingsPreFix: 'RUMBLE',
        types: {
          MOTOR: new ModuleCfg('MotorRumbleHandler'), // when to use a motor as a rumble device
          WEB: new ModuleCfg('WebSocketRumbleHandler'), // when to use mobile vibrating api
          MOCK: new ModuleCfg('MockRumbleHandler') // Mock for rumble
        }
      },{
        name : 'leds',
        settingsPreFix: 'LED',
        types: {
          MOCK : new ModuleCfg('MockLedHandler'), //default Type of led for testing purpose
          WS2812 : new ModuleCfg('WS2812LedHandler') // ws2812 led
        }
      },{
        name : 'infrared',
        settingsPreFix: 'INFRARED',
        types: {
          LIRCD : new ModuleCfg('LircdInfraredHandler'), // when the input comes from the keyboard
          IRMOCK : new ModuleCfg('IrMockHandler'), // Mock of LIRC Deamon
          WSFAKE : new ModuleCfg('FakeWebsocketIrHandler') // Websocket ir handler where you can send receive ir messages over web for DEV.
        }
      },{
        name : 'input',
        settingsPreFix: 'INPUT',
        types: {
          WEB : new ModuleCfg('WebInputHandler',true), // handle input over a websocket
          GPIO: new ModuleCfg('GpioInputHandler'), // handle input over gpio
          KEYBOARD : new ModuleCfg('KeyboardInputHandler') // when the input comes from the keyboard
        }
      },{
        name : 'display',
        settingsPreFix: 'DISPLAY',
        types: {
          WEB : new ModuleCfg('WebSocketDisplay',true), // handle input over a websocket
          SSD1306: new ModuleCfg('SSD1306Display') // OLED Display
        }
      },{
        name : 'sound',
        settingsPreFix: 'SOUND',
        types: {
          LOCAL : new ModuleCfg('LocalSoundHandler') // play via local sound card
        }
      }
    ];

    for(let moduleIdx in this.modulesCfg) {
      const module = this.modulesCfg[moduleIdx];
      this.log.info('ModulesRegistry: going to load module: ' + module.name);
      this._loadModule(module);
      this._checkForAutoLoad(module);
    }
  }

  _checkForAutoLoad(moduleCfg) {
    for(let typesIdx in moduleCfg.types) {
      const moduleType = moduleCfg.types[typesIdx];
      if(moduleType.autoLoad === true) {
        this.log.info('ModulesRegistry: '+moduleCfg.name+' type: '+typesIdx+' is an autoload module loading it');

        const classToLoad = moduleType.className;

        if(classToLoad === undefined) {
          this.log.error('ModulesRegistry: no type or not avaible for: ' + moduleCfg.name + ' ' + moduleType);
          return;
        }

        const pathToRequire = '../modules/'+moduleCfg.name+'/'+classToLoad;
        this.log.debug('ModulesRegistry: Loading from file: '+pathToRequire);
        require('../modules/'+moduleCfg.name+'/'+classToLoad);
      }
    }
  }

  /**
   * Actually tries to load a configured module by its implementation.
   * @param moduleCfg
   * @private
   */
  _loadModule(moduleCfg) {

    const configuredType = this.settings.modules[moduleCfg.settingsPreFix];

    this.log.info('ModulesRegistry: Module: ' + moduleCfg.name + ' is configured with the type: ' + configuredType);

    // check if it is an autoload module
    if(moduleCfg.types[configuredType].autoLoad === true) {
      this.log.info('ModulesRegistry: Module: ' + moduleCfg.name + ' of type: '+configuredType+' is an autoload module skipping it');
      return;
    }

    const classToLoad = moduleCfg.types[configuredType].className;

    if(classToLoad === undefined) {
      throw new Error('ModulesRegistry: no type or not avaible for: ' + moduleCfg.name + ' ' + configuredType);
    }

    const pathToRequire = '../modules/'+moduleCfg.name+'/'+classToLoad;
    this.log.debug('ModulesRegistry: Loading from file: '+pathToRequire);

    this.modules[moduleCfg.name] = require('../modules/'+moduleCfg.name+'/'+classToLoad);

  }

}

module.exports = new ModulesRegistry();