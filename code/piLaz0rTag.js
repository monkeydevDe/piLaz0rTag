// Display
var ntDisplay = require('./modules/display.js');

// Settings
var settings = require('./modules/settings.js');

var settings = new settings();

// minimal Logging
var log = function(text) {
    if (settings.DEBUG_LOG)
        console.log(new Date() + ' MSG: ' + text);
}

// EventHandling
function EvenHandler() {
    // REGISTER ALL ACTIONS IN HERE (order by majority)
    this.actions = {
        FIRE: 1,
        GETHIT: 2,
        //================= Low Prio
        MENUE: 98,

        INIT: 99,
        SYNCTIME: 100
    }
    return {
        doAction: function(action) {
            // all Doings to a action (order by majority)
            switch (action) {
                case actions.FIRE:
                    // reduce Ammo
                    break;
                case actions.GETHIT:
                    // reduce Health
                    break;
                case actions.MENUE:
                    //show menue

                    break;
                case actions.INIT:
                    //Hello world!
                    log('DEBUG ON!');
                    // Print all Settings out
                    if (settings.DEBUG_LOG){
                        log('================== Settings: ==================');
                        //Loop over all Settings
                        for(vars in settings)
                            log(vars +': '+ settings[vars]);
                        log('===============================================');
                    }
                    break;
                case actions.SYNCTIME:
                    break;
            }
        }

    }

}


var eventHandler = EvenHandler();

eventHandler.doAction(actions.INIT);


