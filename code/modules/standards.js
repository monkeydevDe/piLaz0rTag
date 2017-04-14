//This File holds global enum like values

//ALL Possible Actions for the EventHandling
exports.ACTIONS = Object.freeze({
        //maybe fire is due non blocking decisons, done seperatly
        FIRE: 1,
        
        //receive a Hit from another player
        GETHIT: 2,
        
        //receive ammo
        GETAMMO:3,

        //receive health
        GETHEALTH:4,

        //take the flag
        GETFLAG:5,

        //set the starttime
        GETSTARTTIME:6,

        //MENU 
        MENUEOPEN: 95,
        MENUEUP: 96,
        MENUDOWN: 97,
        MENUENTER: 98,

        //receive
        SYNCTIME: 99,
        INIT: 100,
        
    });

//Register all  DISPLAY-TYPES here
exports.DISPLAY_TYPE = Object.freeze( {
        MOCK:"DISPLAY_MOCK", //default Type of Display for testing purpose
        WEB : "DISPLAY_WEB", // will send the data via websocket
        SSD1306I2C:"DISPLAY_SSD1306I2C" // first Display wich runs with piLazOrTag
    });

// Register all INPUT-TYPES here
exports.INPUT_TYPE = Object.freeze( {
  "WEB" : "INPUT_WEB", // handle input over a websocket
  "KEYBOARD" : "INPUT_KEYBOARD" // when the input comes from the keyboard
});

// Register all INFRARED-TYPES here
exports.INFRARED_TYPE = Object.freeze( {
  "LIRCD" : "IR_LIRCD" // when the input comes from the keyboard
});

//All Device States
exports.STATES = Object.freeze({
        MASTER: "MASTER",
        SLAVE: "SLAVE",
        GUN: "GUN"
});

/**
 * Webserver configurations.
 * @type {Object}
 */
exports.WEBSERVERCONF = Object.freeze({
   PORT: 3000
});