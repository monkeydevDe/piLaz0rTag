const {BaseDisplay} = require('./BaseDisplay');

class SSD1306Display extends BaseDisplay {
  constructor() {
    super();
    const Oled = require('oled-ssd1306-i2c');

    this.font = require('oled-font-5x7');

    this.oledDisplay = new Oled(this.settings.SSD1306_CFG);
    this.oledDisplay.update();
    this.oledDisplay.dimDisplay(true);
  }

  handleMainStateChanged(state) {
    this.oledDisplay.clearDisplay();
    this.oledDisplay.setCursor(1, 1);
    this.oledDisplay.writeString(this.font, 1, state, 1, true);
  }
}

module.exports = new SSD1306Display();

