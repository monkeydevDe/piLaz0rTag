var log = require('./Logger.js');
var std = require('./standards.js');

//var oled = require('oled-ssd1306-i2c');
exports.Display = function(displayType) {
    log.info("Display Type: " + displayType); 
    switch(displayType){
        case std.DISPLAY_TYPE.MOCK: 
        return new MockDisplay();
        break;
        case std.DISPLAY_TYPE.SSD1306I2C:
        return new Oled_SSD1306();
        break;
    }
    
};

//Special Display Implementations here

//Implementation of the OLED SS1306 i2c
function Oled_SSD1306(){
    ParentDisplay.call(this,68,124,'OLEDSSD1306');
}
Oled_SSD1306.prototype = Object.create(ParentDisplay.prototype);


//MOCK DISPLAY Implementation
function MockDisplay(){
    ParentDisplay.call(this,1,1,'mocki');
};

MockDisplay.prototype = Object.create(ParentDisplay.prototype);

MockDisplay.prototype.drawAmmo = function(ammoValue) {
    //default prototype as Mock
    log.info("MOCK DISPLAY: Draw Ammunition: "+ammoValue);
};
MockDisplay.prototype.drawHealth = function(healthValue) {
    //default prototype as Mock
    log.info("MOCK DISPLAY: DRAW Health:"+healthValue);
};
MockDisplay.prototype.drawMenu = function(menuValue, Postion) {
    //TODO insert Menu structure
    log.info("MOCK DISPLAY: DRAW Menu");
};

//Parent Object for the Display
function ParentDisplay(height,width,name){
    this.height = height;
    this.width = width;
    this.name = name;
};

ParentDisplay.prototype.drawAmmo = function(ammoValue) {
    //default prototype as Mock
    log.info("PARENT FUNCTION WARN!!! Draw Ammunition with parent functino!");
};

ParentDisplay.prototype.drawHealth = function(healthValue) {
    //default prototype as Mock
    log.info("PARENT FUNCTION WARN!!! DRAW Health");
};
ParentDisplay.prototype.drawMenu = function(menuValue, Postion) {
    //TODO insert Menu structure
    log.info("PARENT FUNCTION WARN!!! DRAW Menu");
};


