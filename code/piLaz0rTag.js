// Logging
const log = require('./modules/Logger.js');

const {LaserTagEventHandler} = require('./lib/LaserTagEventHandler.js');
const lasertTageventHandler = new LaserTagEventHandler(log);

// register here the events we need
lasertTageventHandler.on('ir_received', (irMsg) => {
  log.info('Received ir code ' + irMsg);
});


// Display
let display = require('./modules/display.js');
// Settings
const settings = require('./modules/settings.js');
// Standards
const std = require('./modules/standards.js');
// input keyboard handling
const input = require('./modules/input.js')(log, settings);

// infrared
const {InfraredFactory} = require('./modules/infrared/InfraredFactory.js');
const infrared = new InfraredFactory(log, settings, lasertTageventHandler);

// sound
const {Mp3Sound} = require('./modules/sound/Mp3Sound.js');
const mp3Sound = new Mp3Sound(log,lasertTageventHandler);



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
//while(true) {

//}


// EventHandling
function EventHandler() {
  // REGISTER ALL ACTIONS IN HERE (order by majority)

  return {
    doAction: function(action) {
      // all Doings to a action (order by majority)
      switch(action) {
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
          log.debug('DEBUG ON!');

          // Print all Settings out
          if(settings.DEBUG_LOG) {

            log.info('===============================================');
            //Loop over all Settings
            for(vars in settings)
              log.info(vars + ': ' + settings[vars]);
            log.info('===============================================');

            //log.array(settings);
          }
          //TODO add: show splashscreen on the Display
          //TODO add: show the init Menu {master|slave|gun|update}

          break;
        case actions.SYNCTIME:
          log.line("Sync the time to: XXX");
          break;
      }
    }
  }
}