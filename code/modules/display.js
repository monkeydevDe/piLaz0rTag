var log = require('./logging.js');
var std = require('./standards.js');

exports.Display = function(displayType) {
    // the position of any menu
    var menuPos;

    log.line("Display Type: " + displayType + " set."); 
    switch (displayType) {
        case std.DISPLAY_TYPE.MOCK:
            return new MockDisplay();
            break;
        case std.DISPLAY_TYPE.SSD1306I2C:
            return new Oled_SSD1306();
            break;
    }


};
//
// Special Display Implementations here
//

// Implementation of the OLED SS1306 i2c
function Oled_SSD1306() {

    // var oled = require('oled-ssd1306-i2c');
    ParentDisplay.call(this, 68, 124, 'OLEDSSD1306');
}
Oled_SSD1306.prototype = Object.create(ParentDisplay.prototype);


// MOCK DISPLAY Implementation
function MockDisplay() {
    ParentDisplay.call(this, 1, 1, 'mock');
};

MockDisplay.prototype = Object.create(ParentDisplay.prototype);

MockDisplay.prototype.drawAmmo = function(ammoValue) {
    // default prototype as Mock
    log.line("MOCK DISPLAY: Draw Ammunition: " + ammoValue);
};
MockDisplay.prototype.drawHealth = function(healthValue) {
    // default prototype as Mock
    log.line("MOCK DISPLAY: DRAW Health:" + healthValue);
};
MockDisplay.prototype.drawMenu = function(menuValue, Postion) {
    // TODO insert Menu structure
    log.line("MOCK DISPLAY: DRAW Menu");
};
MockDisplay.prototype.drawMenu = function(menuValue, Postion) {
    // TODO insert Menu structure
    log.line("MOCK DISPLAY: DRAW Menu");
};


//
//Parent Object for the Display
//
function ParentDisplay(height, width, name) {
    this.height = height;
    this.width = width;
    this.name = name;
};

ParentDisplay.prototype.drawAmmo = function(ammoValue) {
    // default prototype as Mock
    log.line("PARENT FUNCTION WARN!!! Draw Ammunition with parent functino!");
};

ParentDisplay.prototype.drawHealth = function(healthValue) {
    // default prototype as Mock
    log.line("PARENT FUNCTION WARN!!! DRAW Health");
};
ParentDisplay.prototype.drawMenu = function(menuValue, Postion) {
    // TODO insert Menu structure
    log.line("PARENT FUNCTION WARN!!! DRAW Menu");
};
ParentDisplay.prototype.clearDisplay = function(menuValue, Postion) {
    // TODO insert Menu structure
    log.line("PARENT FUNCTION WARN!!! Clean Display");
};
ParentDisplay.prototype.drawSingleMiddelLineCentered = function(line) {
    // TODO Calculate Size an Position
    log.line("PARENT FUNCTION WARN!!! drawSingleMiddelLineCentered:" + line);
};
ParentDisplay.prototype.drawMenuSingleEntry = function(title, showLeftBracket, showRightBracket) {
    // clear Display
    // draw endles menu enclosed with "<" ">"
    // e.g. < Gun >

    // left bracket
    var strToDisplay;
    if (showLeftBracket) {
        strToDisplay = " < "
    } else {
        strToDisplay = "  "
    };
    // print the title in the middel of possible brackets
    strToDisplay += title;
    // right bracket
    if (showRightBracket) {
        strToDisplay += " > "
    } else {
        strToDisplay += "  "
    };
    // Print the string with a Single centered line
    this.drawSingleMiddelLineCentered(strToDisplay);
}

ParentDisplay.prototype.initinitialMenu = function() {
    // show the init Menu {master|slave|gun|update}
    this.menu = this.initialMenu();
    this.menu.init();
    this.drawSingleMiddelLineCentered(this.menu.lineToDraw());
}

ParentDisplay.prototype.menuMinus = function() {
        // Wrapper for the menu left/up
    this.menu.left();
    this.drawSingleMiddelLineCentered(this.menu.lineToDraw());
}

ParentDisplay.prototype.menuPlus = function() {
    // Wrapper for the menu right/down
    this.menu.right();
    this.drawSingleMiddelLineCentered(this.menu.lineToDraw());
}

ParentDisplay.prototype.initialMenu = function() {

    var pos;
    // show the init Menu {master|slave|gun|update}
    return {
        // init function of the inital menu
        init: function() {
            log.line("inital Menu: init");
            this.pos = 0;
        },
        // inidvidual handling of menuMinus action
        left: function() {
            if (this.pos > 0) {
                log.line("inital Menu: left to pos: " + this.pos);
                this.pos--;
            }
        },
        // inidvidual handling of menuPlus action
        right: function() {
            if (this.pos < 3) {
                this.pos++;
                log.line("inital Menu: right to pos: " + this.pos);
            }
        },
        // inidvidual handling draw the menu
        lineToDraw: function() {
            log.line("inital Menu: draw pos: " + this.pos);
            switch (this.pos) {
                case 0:
                    return "  master >";
                    break;
                case 1:
                    return "< slave >";
                    break;
                case 2:
                    return "< gun >"
                    break;
                case 3:
                    return "< update  "
                    break;
            }
        }
        action: function() {
            log.line("inital Menu: action for pos: " + this.pos);
            switch (this.pos) {
                case 0:
                    // be a master
                    break;
                case 1:
                    // be a slave
                    break;
                case 2:
                    // be a gun dude
                    break;
                case 3:
                    // do an update
                    break;
            }
        }
        }
    }

}