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

// esp32 pcb parameters
esp32Height=25;
esp32Length=57;

// display parameters
displayCutOutWidth=26;
displayCutOutHeight=20;
displayCutOutThickness=3;
displayPcbWidth=26;
displayPcbHeight=26;
displayThickness=10;

// gun wall thickness
gunWallThickness=3;

// lid
gunBodyLidThickness= gunWallThickness / 2;
gunBodyLidHeight = 1.5;

// esp32 standoff
esp32StandoffBaseHeight = gunWallThickness;
esp32StandoffScrewHoleDia=2;
esp32StandoffScrewHolderDia = esp32StandoffScrewHoleDia * 2;
esp32StandoffLength = esp32Length ;
esp32StandoffHeight = esp32Height;
esp32StandoffBaseSpace=3;
esp32StandoffHoles = [[55,2], [55,23]];
esp32StandoffPoles = [[2,2], [2,23]];

// display holder
displayHolderWidth = displayPcbWidth + 4;
displayHolderHeight = displayPcbHeight + 4;
displayHolderBaseThickness = gunWallThickness;
displayHolderPoleWidth=6;

// gun parameters
gunHeight=lensTubeFixLength + esp32StandoffHeight + 10;
gunFrontLength = lensTubeLength + 10;
gunBackLength = 150 + displayThickness;
gunBodyTopSpace = 3;
gunThickness = lensTubeFixHeight + 2 * gunWallThickness + gunBodyTopSpace;
gunBottomThickness = gunThickness - gunWallThickness - gunBodyTopSpace;
gunTopThickness = gunWallThickness + gunBodyTopSpace;
gunBackHeight =  gunHeight - displayHolderWidth - gunWallThickness;

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


// trigger switch 
triggerSwitchHeight=19;
triggerSwitchWidth=10;
triggerSwitchThickness=5;
triggerSwitchScrewHoleDia=2;
triggerSwitchScrewHoleHeightOffset=3;
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

