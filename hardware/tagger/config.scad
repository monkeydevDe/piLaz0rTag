// detail of round surfaces
$fn=100;

// lens tube dims
lensTubeDiameter=45;
lensTubeLength=200;

// lens tube fixiations dims 
lensTubeFixWidth=10;
lensTubeFixLengthFlesh=10;
lensTubeFixLength=lensTubeDiameter + 2 * lensTubeFixLengthFlesh;
lensTubeFixHeightFlesh=1;
lensTubeFixHeight=lensTubeDiameter + 2 * lensTubeFixHeightFlesh;
lensTubeGap=1.5;



// gun wall thickness
gunWallThickness=2;

// vibration motor pcb
vibrationPcbWidth=20;
vibrationPcbHeight=23;
vibrationStandoffBaseSpace=2;
vibrationStandoffScrewHoleDia=3;
vibrationStandoffScrewHolderDia = vibrationStandoffScrewHoleDia * 1.5;
vibrationStandoffHoles = [[vibrationStandoffScrewHolderDia / 2,vibrationPcbHeight - vibrationStandoffScrewHolderDia / 2], 
                          [vibrationPcbWidth  - vibrationStandoffScrewHolderDia / 2,vibrationPcbHeight - vibrationStandoffScrewHolderDia / 2]];
vibrationStandoffPoles = [[vibrationStandoffScrewHolderDia / 2,vibrationStandoffScrewHolderDia / 2], 
                          [vibrationPcbWidth - vibrationStandoffScrewHolderDia / 2,vibrationStandoffScrewHolderDia / 2]];
vibrationStandoffBaseHeight = gunWallThickness;


// lid
gunBodyLidThickness= gunWallThickness / 2;
gunBodyLidHeight = 1.5;

// esp32 standoff
esp32Height=25;
esp32Length=57;
esp32StandoffBaseHeight = gunWallThickness;
esp32StandoffScrewHoleDia=2;
esp32StandoffScrewHolderDia = esp32StandoffScrewHoleDia * 2;
esp32StandoffBaseSpace=3;
esp32StandoffHoles = [[55,2], [55,23]];
esp32StandoffPoles = [[2,2], [2,23]];

// display parameters
/*displayCutOutWidth=26;
displayCutOutHeight=20;
displayCutOutThickness=3;*/

displayPcbWidth=27;
displayPcbHeight=27;
displayThickness=10;

// display holder
displayHolderPoleWidth=6;
displayHolderScrewOffset=1;
displayHolderScrewDia=2;

// gun parameters
gunHeight=lensTubeFixLength + esp32Height + 10;
gunFrontLength = lensTubeLength + 10;
gunBackLength = 150 + displayThickness;
gunBodyTopSpace = 3;
gunThickness = lensTubeFixHeight + 2 * gunWallThickness + gunBodyTopSpace;
gunBottomThickness = gunThickness - gunWallThickness - gunBodyTopSpace;
gunTopThickness = gunWallThickness + gunBodyTopSpace;
gunBackHeight =  gunHeight - displayPcbWidth - gunWallThickness;

// gun body connector poles
gunBodyConPoleWidth=5;
gunBodyConPoleTopHoleDia=2;
gunBodyConPoleTopHoleHeight=3;
gunBodyConPolPositions = [
  // bottom poles
  [gunWallThickness,gunWallThickness],
  [gunFrontLength / 2, gunWallThickness],
  [gunFrontLength / 2 + gunBodyConPoleWidth, gunWallThickness],
  [gunFrontLength - gunBodyConPoleWidth * 4, gunWallThickness],
  [gunFrontLength  - gunBodyConPoleWidth * 3, gunWallThickness],
  //top poles
  [gunWallThickness + lensTubeFixWidth, gunHeight - gunWallThickness - gunBodyConPoleWidth],
  [gunFrontLength / 2, gunHeight - gunWallThickness - gunBodyConPoleWidth],
  [gunFrontLength / 2 + gunBodyConPoleWidth, gunHeight - gunWallThickness - gunBodyConPoleWidth]
];

// grip parameters
gripWidth=50;
gripHeight=120;
gripFrontOffset=200;
gripCornerRadius=5;
gripAngle=15;

// speaker parameters
speakerDiameter=40;
speakerHeight=24;
speakerHolderTopHeight=3;
speakerHolderWallThickness=2;
speakerHolderHeight=speakerHeight + speakerHolderTopHeight;
speakerHolderDia=speakerDiameter + 2 * speakerHolderWallThickness;
speakerHolderScrewDia=1.5;
speakerHolderScrewHeight=speakerHolderHeight / 2;
speakerHolderScrewPoleDia=4*speakerHolderScrewDia;
speakerGrillBarHeight = 3;

// receiver pcb
receiverPcbHeight=20;
receiverPcbWidth=20;
receiverHolderScrewDia=2;
receiverHolderScrewOffset=1;
receiverHolderPoleWidth=6;
receiverHolderRotation=[90, 0, 0];


// trigger switch 
triggerSwitchHeight=20;
triggerSwitchWidth=10;
triggerSwitchThickness=5;
triggerSwitchScrewHoleDia=2;
triggerSwitchScrewHoleHeightOffset=3.5;
triggerSwitchScrewHoleBackOffset=1.5;
triggerSwitchScrewHolesOffset=7;
triggerSwitchScrewHolesHeight=2;

// trigger variables
triggerHeight=35;
triggerFrontLength=27;
triggerBackLength=18;
triggerThickness=6;
triggerPoleDia=5;
triggerPoleScrewDia=3;
triggerPoleSpace=0.5;
triggerPoleRailDia=triggerPoleDia+triggerPoleSpace;
triggerPoleRailFlesh=3;
triggerSpringPinDia=4;
triggerSpringPinLength=3;
triggerSpringSpace=5;

// trigger guidance
triggerGuidanceWallThickness=1.5;
triggerGuidanceFlesh=0.5;
triggerGuidanceLength=triggerBackLength + triggerSpringPinLength * 2 + triggerSpringSpace + triggerGuidanceWallThickness;
triggerGuidanceHeight=triggerHeight + 2 * triggerGuidanceWallThickness + triggerGuidanceFlesh;
triggerGuidanceBottomThickness=1.5;
triggerGuidanceThickness=triggerThickness+triggerGuidanceFlesh+triggerGuidanceBottomThickness;

