// Logging
const log = require('./lib/Logger.js');

// Settings
const settings = require('./modules/settings.js');
// Standards
const std = require('./modules/standards.js');

// input keyboard handling
const input = require('./modules/input/InputFactory');

// infrared
const infrared = require('./modules/infrared/InfraredFactory');

// webserver
const webserver = require('./modules/web/Webserver');

// display
const display = require('./modules/display/DisplayFactory');


// simple test game
const { TeamDeathMatchGame } = require('./lib/game/TeamDeathMatchGame');
const { Player } = require('./lib/game/Player');
const player = new Player(1,'red',3,100,5000,75,5,30,3000,500);
const game = new TeamDeathMatchGame(player,{});


// init event handling
var eventHandler = EventHandler();
eventHandler.doAction(std.ACTIONS.INIT);

//delete me! im only for testing pupose
eventHandler.doAction(std.ACTIONS.FIRE);


// EventHandling
function EventHandler() {
  // REGISTER ALL ACTIONS IN HERE (order by majority)

  return {
    doAction: function(action) {
      // all Doings to a action (order by majority)
      switch(action) {
        case std.ACTIONS.FIRE:
          // reduce Ammo
          //display.drawAmmo(100);
          break;
        case std.ACTIONS.GETHIT:
          // reduce Health
          break;
        case std.ACTIONS.MENUE:
          //show menue
          break;
        case std.ACTIONS.INIT:
          //initalize display
          //display = new display.Display(settings.DISPLAY);
          //Hello world!
          log.debug('DEBUG ON!');

          // Print all Settings out
          if(settings.DEBUG_LEVEL) {

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