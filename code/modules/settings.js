//get the default values
var std = require('./standards.js');
module.exports = {
    //General
    DEBUG_LEVEL: 'debug',
    DISPLAY: std.DISPLAY_TYPE.WEB,
    INPUT: std.INPUT_TYPE.WEB,
    INFRARED: std.INFRARED_TYPE.IRWSFAKE,
    //this.DISPLAY = DISPLAY_TYPE.SSD1306I2C;
    //Display settings
    DISPLAY_LAYOUT: 0,
    WEBSERVER_PORT: std.WEBSERVERCONF.PORT
};