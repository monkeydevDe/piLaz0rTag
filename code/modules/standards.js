//This File holds global enum like values



//Register all  DISPLAY-TYPES here
exports.DISPLAY_TYPE = Object.freeze( {
        MOCK:"DISPLAY_MOCK", //default Type of Display for testing purpose
        WEB : "DISPLAY_WEB", // will send the data via websocket
        SSD1306I2C:"DISPLAY_SSD1306I2C" // first Display wich runs with piLazOrTag
    });

//Register all  LED-TYPES here
exports.LED_TYPE = Object.freeze( {
  MOCK :"LED_MOCK", //default Type of led for testing purpose
  WS2812 : "LED_WS2812", // ws2812 led
});

// Register all INPUT-TYPES here
exports.INPUT_TYPE = Object.freeze( {
  "WEB" : "INPUT_WEB", // handle input over a websocket
  "KEYBOARD" : "INPUT_KEYBOARD" // when the input comes from the keyboard
});

// Register all INFRARED-TYPES here
exports.INFRARED_TYPE = Object.freeze( {
  "LIRCD" : "IR_LIRCD", // when the input comes from the keyboard
  "IRMOCK" : "IRMOCK", // Mock of LIRC Deamon
  "IRWSFAKE" : "IRWSFAKE" // Websocket ir handler where you can send receive ir messages over web for DEV.
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