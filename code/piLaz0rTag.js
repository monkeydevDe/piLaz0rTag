// Display
var display = require('./modules/display.js');
// Settings
var settings = require('./modules/settings.js');
// Standards
var std = require('./modules/standards.js');
// Logging
var log = require('./modules/logging.js');


// init event handling
var eventHandler = EventHandler();
//init
eventHandler.doAction(std.ACTIONS.INIT);

//delete me! im only for testing pupose
eventHandler.doAction(std.ACTIONS.FIRE);

// Game Loop


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
                    break;
                case actions.SYNCTIME:
                    break;
            }
        }

    }

}
