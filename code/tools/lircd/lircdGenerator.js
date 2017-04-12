/**
* Simple tool which generate the lircd conf for piLaz0rTag
*/
const fs = require('fs');

var templateData = fs.readFileSync('./lircd_template.conf','utf-8');


console.error(templateData);

