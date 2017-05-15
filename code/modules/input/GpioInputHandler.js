/**
 * Input over gpio pins
 */
const { BaseInputHandler } = require('./BaseInputHandler');

class GpioInputHandler extends BaseInputHandler {
  constructor() {

    super();

    const Gpio = require('onoff').Gpio;


    this.triggerBtn = new Gpio(this.settings.GPIO_INPUT_CFG.TRIGGER_GPIO, 'in', 'both');
    this.reloadBtn = new Gpio(this.settings.GPIO_INPUT_CFG.RELOAD_GPIO, 'in', 'both');
    this.upBtn = new Gpio(this.settings.GPIO_INPUT_CFG.UP_GPIO, 'in', 'both');
    this.downBtn = new Gpio(this.settings.GPIO_INPUT_CFG.DOWN_GPIO, 'in', 'both');
    this.func1Btn = new Gpio(this.settings.GPIO_INPUT_CFG.FUNC1_GPIO, 'in', 'both');
    this.func2Btn = new Gpio(this.settings.GPIO_INPUT_CFG.FUNC2_GPIO, 'in', 'both');


    const instance = this;
    
    this.triggerBtn.watch(function(err, value) {
      if(value === 0) {
        instance.triggerShot();
      }
    });

    this.reloadBtn.watch(function(err,value) {
       if(value === 0) {
         instance.triggerReload();
       }
    });
  }

  _cleanUpInternal() {
    this.triggerBtn.unexport();
    this.reloadBtn.unexport();
    this.upBtn.unexport();
    this.downBtn.unexport();
    this.func1Btn.unexport();
    this.func2Btn.unexport();
  }

}

module.exports = new GpioInputHandler();