// load Settings
//TODO: check if this the best way to use settings with logging)
var settings = require('./settings.js');

var log = {
    line: function(text) {
        if (settings.DEBUG_LOG) console.log(new Date() + ' MSG: ' + text);

    },
    array: function(set) {
        this.line('===============================================');
        //Loop over all Settings
        for (vars in set)
            this.line(vars + ': ' +  settings[vars]);
        this.line('===============================================');

    }
}


module.exports = log;