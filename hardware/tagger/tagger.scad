/**
* Tagger which can be printed.
* All dimensions are in millimeters
*/


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

// pcb parameters
esp32Height=25;
esp32Length=57;


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

// gun parameters
gunHeight=lensTubeFixLength + esp32StandoffHeight + 10;
gunFrontLength = lensTubeLength + 10;
gunBackLength = 150 + displayThickness;
gunBodyTopSpace = 3;
gunThickness = lensTubeFixHeight + 2 * gunWallThickness + gunBodyTopSpace;
gunBottomThickness = gunThickness - gunWallThickness - gunBodyTopSpace;
gunTopThickness = gunWallThickness + gunBodyTopSpace;

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
gripHeight=100;
gripFrontOffset=200;
gripCornerRadius=5;



/**
* Fixiation for the lens tube
*/
module lensTubeFixiation() {
  difference() {
    cube(size=[lensTubeFixWidth, lensTubeFixLength, lensTubeFixHeight], center=false);     
    translate([0, lensTubeFixLength / 2, lensTubeFixHeight / 2]) {
      rotate([0, 90, 0]) {
        cylinder(d=lensTubeDiameter, h=lensTubeFixWidth, center=false);    
      }  
    }

    // cut of the top
    offset = lensTubeFixHeight / 2 - lensTubeGap / 2;
    translate([0, 0, offset]) {
      cube(size=[lensTubeFixWidth, lensTubeFixLength, lensTubeFixHeight / 2 + lensTubeGap / 2], center=false);
    }
  }
}

module gunBodyFront() {
  difference() {    
    cube(size=[gunFrontLength, gunHeight, gunBottomThickness], center=false);
    translate([gunWallThickness, gunWallThickness, gunWallThickness]) {
      cube(size=[gunFrontLength -  gunWallThickness, gunHeight - gunWallThickness * 2,gunBottomThickness - gunWallThickness ], center=false);
    }

    // add lid to front body
    translate([gunWallThickness - gunBodyLidThickness, gunWallThickness - gunBodyLidThickness, gunBottomThickness - gunBodyLidHeight]) {
      cube(size=[gunFrontLength - gunBodyLidThickness * 2, gunHeight - gunBodyLidThickness * 2, gunBodyLidHeight], center=false);
    }
  }

  


}

module gunBodyBack() {
  gunBackHeight =  gunHeight - displayHolderWidth - gunWallThickness;
  union() {
    difference() {
      cube(size=[gunBackLength, gunBackHeight, gunBottomThickness], center=false);
      translate([0, gunWallThickness, gunWallThickness]) {
        cube(size=[gunBackLength - gunWallThickness, gunBackHeight - gunWallThickness * 2, gunBottomThickness - gunWallThickness], center=false);      
      }

      // add lid to back body
      translate([gunWallThickness - gunBodyLidThickness, gunWallThickness - gunBodyLidThickness, gunBottomThickness - gunBodyLidHeight]) {
        cube(size=[gunBackLength - gunBodyLidThickness * 2, gunBackHeight - gunBodyLidThickness * 2, gunBodyLidHeight], center=false);
      }
    }
    
    // display part  
    translate([0, gunBackHeight, 0]) {      
      cube(size=[gunWallThickness, displayHolderWidth + gunWallThickness, gunBottomThickness], center=false);     
    }
    
  
  }
}

module gripBody() {
  translate([gripCornerRadius, gripCornerRadius, gripCornerRadius]) {  
    difference() {
      minkowski() {
        cube(size=[gripWidth - 2 * gripCornerRadius , gripHeight - gripCornerRadius, gunBottomThickness -  gripCornerRadius], center=false);
        sphere(r=gripCornerRadius);
      }

      translate([gunWallThickness, gunWallThickness, gunWallThickness]) {
        minkowski() {
          cube(size=[gripWidth - 2 * gripCornerRadius - 2 * gunWallThickness , gripHeight - gripCornerRadius - 2 * gunWallThickness , gunBottomThickness -  gripCornerRadius], center=false);
          sphere(r=gripCornerRadius);
        }
      }


      // cut off the top
      translate([-gripCornerRadius, - gripCornerRadius, gunBottomThickness - gripCornerRadius]) {
        cube(size=[gripWidth, gripHeight + gripCornerRadius, gripCornerRadius], center=false);
      }

      // cut of the cap
      translate([-gripCornerRadius, gripHeight - gripCornerRadius * 2, -gripCornerRadius]) {
        cube(size=[gripWidth,  gripCornerRadius * 2, gunBottomThickness], center=false);
      } 

      // add lid to front body
      translate([-gripCornerRadius + gunWallThickness - gunBodyLidThickness,-gripCornerRadius + gunWallThickness - gunBodyLidThickness,-gripCornerRadius + gunBottomThickness - gunBodyLidHeight]) {
        cube(size=[gripWidth - gunBodyLidThickness * 2, gripHeight - gunBodyLidThickness * 2, gunBodyLidHeight], center=false);
      }    
    }
  }
}

module gunBody() {
  union() {
    difference() {
      gunBodyFront();
      tubeHoleOffset = gunHeight - lensTubeFixLengthFlesh - gunWallThickness - lensTubeDiameter / 2;
      
      // add hole for the lenstube
      translate([0,tubeHoleOffset,gunWallThickness + lensTubeDiameter / 2 + lensTubeFixHeightFlesh]) {
        rotate([0, 90, 0]) {
          #cylinder(d=lensTubeDiameter, h=gunWallThickness, center=false);
        }  
      }
      
    }

    // add the lens tube fixiation
    translate([gunWallThickness, gunHeight - lensTubeFixLength - gunWallThickness, gunWallThickness ]) {
      lensTubeFixiation();  
      translate([lensTubeLength - 2 * lensTubeFixWidth, 0, 0]) {
        lensTubeFixiation();   
      }
    }

    

    translate([gunFrontLength, 0, 0]) {
      gunBodyBack();   
    }
  }
}

module esp32Standoff() {
  color([255/255, 0, 0]) {
    union() {
      cube(size=[esp32StandoffLength, esp32StandoffHeight, esp32StandoffBaseHeight], center=false);  
      
      
      // create hole spacers
      for (i=esp32StandoffHoles) {
        translate([i[0],i[1], esp32StandoffBaseHeight]) {
          difference() {
            cylinder(d=esp32StandoffScrewHolderDia, h=esp32StandoffBaseSpace, center=false, $fn = 100);  
            cylinder(d=esp32StandoffScrewHoleDia, h=esp32StandoffBaseSpace, center=false, $fn = 100);  
          }
        }        
      }

      // create pole spacers
      for (i=esp32StandoffPoles) {
        translate([i[0],i[1], esp32StandoffBaseHeight]) {
          difference() {
            cylinder(d=esp32StandoffScrewHolderDia, h=esp32StandoffBaseSpace, center=false, $fn = 100);              
          }
        }        
      }
      
    }

  }  
}

module displayHolder() {
  color([0/255, 0, 255/255]) {
    difference() {
      cube(size=[displayHolderBaseThickness + displayCutOutThickness,displayHolderWidth, displayHolderHeight ], center=false);

      translate([displayHolderBaseThickness, (displayHolderWidth - displayCutOutWidth) / 2, (displayHolderHeight - displayCutOutHeight) / 2]) {
        cube(size=[gunWallThickness,displayCutOutWidth,displayCutOutHeight], center=false);  
      }

      translate([0,(displayHolderWidth - displayPcbWidth) / 2, (displayHolderHeight - displayPcbHeight) / 2]) {
        cube(size=[gunWallThickness,displayPcbWidth, displayPcbHeight], center=false);  
      }
    }
  }
}

module gunBodyConPole() {
  color("MediumSeaGreen") {    
    difference() {
      poleHeight = gunBottomThickness - gunWallThickness - gunBodyLidHeight;
      cube(size=[gunBodyConPoleWidth, gunBodyConPoleWidth, poleHeight], center=false);  
      translate([gunBodyConPoleWidth / 2,gunBodyConPoleWidth / 2,poleHeight - gunBodyConPoleTopHoleHeight]) {
        cylinder(d=gunBodyConPoleTopHoleDia, h=gunBodyConPoleTopHoleHeight, center=false);
      }
    }   
  }  
}





difference() {
  gunBody();
  // cut out grip opening
  translate([gripFrontOffset + gunWallThickness, 0, gunWallThickness]) {
    cube(size=[gripWidth - 2 * gunWallThickness, gunWallThickness, gunBottomThickness - gunWallThickness], center=false);
  }
}

translate([gunFrontLength - gunWallThickness - esp32StandoffLength,gunWallThickness + 2,0]) {
  esp32Standoff();
}

translate([gripFrontOffset, -gripHeight + gripCornerRadius, 0]) {
  rotate([0, 0, 0]) {
    gripBody();      
  }
}

translate([gunFrontLength, 70, gunWallThickness]) {
  displayHolder();  
}

for (i=gunBodyConPolPositions) {
  translate([i[0], i[1], gunWallThickness]) {
    gunBodyConPole();
  }
}







