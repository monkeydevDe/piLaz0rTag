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
// init menu handling
var menuHandler = MenuHandler();
// init
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
                    // show menue

                    break;
                case std.ACTIONS.INIT:
                    // initalize display
                    display = new display.Display(settings.DISPLAY);
                    // report if debugging is true
                    log.line('DEBUG ON!');

                    // print all Settings out
                    if (settings.DEBUG_LOG) {
                        log.array(settings);
                    }
                    
                    // initalize the inital menu of the game
                    menuHandler.InitInitalMenu();
                    break;
                case actions.SYNCTIME:
                    break;
            }
        }

    }

}

function MenuHandler() {
    // andle the visibilty of different menus
    var visible = false;
    var itemWithFocus;
    
    return {
        InitInitalMenu: function() {
            log.line("menuHanlder: init inital menu");
            itemWithFocus = std.STATES.MASTER;
            // draw first apperance of the inital menu this should be like "   MASTER > "
            display.drawMenuSingleEntry(itemWithFocus, false, true);
        }
    }
}