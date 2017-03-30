//var oled = require('oled-ssd1306-i2c');

var oled = function() {
    //mock display

}




var opts = {
    width: 128,
    height: 64,
};

var oled = new oled(opts);

var Display = function(params) {

    // Avoid nullpointer even if the opts are not set
    if (params == null) {
        params = {}
    }

    //default params if not set
    this.HEIGHT = params.height || 64;
    this.WIDTH = params.width || 128;
    this.LAYOUT = param.layout ||  0;
}