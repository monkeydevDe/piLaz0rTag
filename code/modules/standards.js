//This File holds global enum like values

//ALL DISPLAY-TYPES IN HERE
exports.DISPLAY_TYPE = Object.freeze( {
		MOCK:"DISPLAY_MOCK", //default Type of Display for testing purpose
		SSD1306I2C:"DISPLAY_SSD1306I2C" // first Display wich runs with piLazOrTag
	});
//ALL Possible Actions for the EventHandling
exports.ACTIONS = Object.freeze({
        FIRE: 1,
        GETHIT: 2,
        //================= 
        MENUE: 98,
        INIT: 99,
        SYNCTIME: 100
    });