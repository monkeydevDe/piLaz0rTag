//get the default values
var std = require('./standards.js');
module.exports = {
    //General
    DEBUG_LOG: true,
    DISPLAY: std.DISPLAY_TYPE.MOCK,
    INPUT: std.INPUT_TYPE.KEYBOARD,
    INFRARED: std.INFRARED_TYPE.LIRCD,
    //this.DISPLAY = DISPLAY_TYPE.SSD1306I2C;
    //Display settings
    DISPLAY_LAYOUT: 0
};