// Display
var display = require('./modules/display.js');
// Settings
var settings = require('./modules/settings.js');
// Standards
var std = require('./modules/standards.js');
// Logging
var log = require('./modules/logging.js');

var input = require('./modules/input.js')(log,settings);

//global vars
var health;
var shield;
var state;

// init event handling
var eventHandler = EventHandler(); 
eventHandler.doAction(std.ACTIONS.INIT);

//delete me! im only for testing pupose
eventHandler.doAction(std.ACTIONS.FIRE);

// Game Loop
while(true) {
    
}


// EventHandling
function EventHandler() {
    // REGISTER ALL ACTIONS IN HERE (order by majority)

    return {
        doAction: function(action) {
            // all Doings to a action (order by majority)
            switch (action) {
                case std.ACTIONS.FIRE:
                    // reduce Ammo
                    display.drawAmmo(100);
                    break;
                case std.ACTIONS.GETHIT:
                    // reduce Health
                    break;
                case std.ACTIONS.MENUE:
                    //show menue
                    break;
                case std.ACTIONS.INIT:
                    //initalize display
                    display = new display.Display(settings.DISPLAY);
                    //Hello world!
                    log.line('DEBUG ON!');

                    // Print all Settings out
                    if (settings.DEBUG_LOG) {
                        log.array(settings);
                    }
                    //TODO add: show splashscreen on the Display
                    //TODO add: show the init Menu {master|slave|gun|update}
                    display.initinitialMenu();

                    // DELETE ME! some menu  action for testing purpose
                    display.menuMinus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuMinus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuPlus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuPlus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuPlus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuPlus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuMinus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuMinus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuPlus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuMinus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuPlus();
                    // DELETE ME! some menu  action for testing purpose
                    display.menuPlus();


                    break;
                case actions.SYNCTIME:
                    log.line("Sync the time to: XXX");
                    break;
            }
        }
    }
}