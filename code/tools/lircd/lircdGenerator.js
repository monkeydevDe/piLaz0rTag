/**
 * Simple tool which generate the lircd conf for piLaz0rTag
 * http://www.lasertagparts.com/mtformat-2.htm
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
 * http://www.binaryhexconverter.com/binary-to-decimal-converter
 *
 * Protocoll is a 10 BIT mash follows:
 *
 * T PPPPP TE ST
 * 0 00000 00 00
 *
 * T: 0 is a shoot package
 *
 * WHEN T is 0 than following mapping:
 *
 * PPPPP: = 00000 to 11111 is the playerid 0 to 31
 * TE: Team id 00 = red, 01 = blue, 10 = yellow, 11 = green
 * ST: Shoot strength 00 = 25, 01 = 50, 10 = 75; 11 = 100
 *
 */
const fs = require('fs');

/**
 * Read the template lines
 */
let templateData = fs.readFileSync('./lircd_template.conf', 'utf-8');

/**
 * How many player are allowed
 * @type {number}
 */
const amountOfPlayer = Number(31);

/**
 * Available teams
 * @type {[*]}
 */
const teams = ['red', 'blue', 'yellow', 'green'];

/**
 * Available shoot strength
 * @type {[*]}
 */
const shootStrengths = ['25', '50', '75', '100'];

/**
 * Padding for the generated hex number
 * @type {number}
 */
const hexPadding = 4;

/**
 * Holds the lines which are inserted into the template ${codes} placeholder
 * @type {string}
 */
let lircdLines = '';

console.info('Generating lircd conf file for players: ' + (amountOfPlayer + 1) + ' teams: ' + teams + " shoot strength: " + shootStrengths);

// iterate over the players
for(let playerNumber = 0; playerNumber <= amountOfPlayer; playerNumber++) {

  // first we calculate the player
  let playerLircNumber = Number(playerNumber * 16);

  //console.error(playerNumber + ' = ' + shootNumber);

  // iterate over the teams
  for(let teamIdx in teams) {

    let teamColor = teams[teamIdx];

    // calculate the team value to the shoot value
    let teamLircNumber = playerLircNumber + ((Number(teamIdx)) * 4);

    //console.error(playerNumber + ' ' + teamIdx + ' = ' + teamLircNumber);

    // iterate over the shoot strength
    for(let strengthIdx in shootStrengths) {

      let strengthName = shootStrengths[strengthIdx];

      let shootLircNumber = teamLircNumber + (Number(strengthIdx));

      //console.error(playerNumber + ' ' + teamIdx + ' ' +strengthIdx+ ' = ' + shootLircNumber);

      let hex = shootLircNumber.toString(16);
      while(hex.length < hexPadding) {
        hex = "0" + hex;
      }

      let lircdName = 'shoot_' + playerNumber + '_' + teamColor + '_' + strengthName;

      let lircdLine = '      ' + lircdName + '   0x' + hex;

      lircdLines += lircdLine + '\n';
    }
  }


}

templateData = templateData.replace('${codes}', lircdLines);

fs.writeFileSync('lircd_generated.conf', templateData);

console.info('Successfully generated lircd_generated.conf');

console.info('To use it do the following: ');
console.info('sudo cp lircd_generated.conf /etc/lirc/lircd.conf');
console.info('sudo /etc/init.d/lirc restart');