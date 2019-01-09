/**
* Tagger which can be printed.
* All dimensions are in millimeters
*/


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

// trigger variables
triggerHeight=35;
triggerFrontLength=27;
triggerBackLength=18;
triggerThickness=6;
triggerPoleDia=5;
triggerPoleScrewDia=1.5;
triggerPoleSpace=0.5;
triggerPoleRailDia=triggerPoleDia+triggerPoleSpace;
triggerPoleRailFlesh=3;
triggerSpringPinDia=triggerThickness;
triggerSpringPinLength=3;
triggerSpringSpace=5;

// trigger guidance
triggerGuidanceWallThickness=3;
triggerGuidanceFlesh=0.5;
triggerGuidanceLength=triggerBackLength + triggerSpringPinLength * 2 + triggerSpringSpace + triggerGuidanceWallThickness;
triggerGuidanceHeight=triggerHeight + 2 * triggerGuidanceWallThickness + triggerGuidanceFlesh;
triggerGuidanceThickness=10;

// rotates the object on a point in itself for example to rotate on the half of the object
module rotate_about_pt(a, pt) {
  translate(pt)
    rotate(a)
      translate(-pt)
        children();   
}


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
  translate([0, 0, gripCornerRadius]) {
  
    rotate_about_pt(gripAngle,[0,gripHeight + gripCornerRadius,0]) {
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
        rotate_about_pt(-gripAngle,[0,gripHeight - gripCornerRadius,0]) {
          // cut of the cap
          translate([-gripCornerRadius, gripHeight - gripCornerRadius * 2, -gripCornerRadius]) {
            cube(size=[gripWidth + gripCornerRadius,  gripHeight, gunBottomThickness], center=false);
          }   
        }
        // add lid to grip body
        translate([-gripCornerRadius + gunWallThickness - gunBodyLidThickness,-gripCornerRadius + gunWallThickness - gunBodyLidThickness,-gripCornerRadius + gunBottomThickness - gunBodyLidHeight]) {
          cube(size=[gripWidth - gunBodyLidThickness * 2, gripHeight - gunBodyLidThickness * 2, gunBodyLidHeight], center=false);
        }    
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
    pcbStandOff(esp32StandoffLength, 
      esp32StandoffHeight,
      esp32StandoffBaseHeight,
      esp32StandoffHoles,
      esp32StandoffPoles,
      esp32StandoffBaseSpace,
      esp32StandoffScrewHolderDia,
      esp32StandoffScrewHoleDia);
  }  
}

module pcbStandOff(length, height, baseHeight, standOffHoles, standoffPoles, space, dia, screwDia) {
  union() {
    cube(size=[length, height, baseHeight], center=false);  
          
    // create hole spacers
    for (i=standOffHoles) {
      translate([i[0],i[1], baseHeight]) {
        difference() {
          cylinder(d=dia, h=space, center=false, $fn = 100);  
          cylinder(d=screwDia, h=space, center=false, $fn = 100);  
        }
      }        
    }
    // create pole spacers
    for (i=standoffPoles) {
      translate([i[0],i[1], baseHeight]) {
        difference() {
          cylinder(d=dia, h=space, center=false, $fn = 100);              
        }
      }        
    }
  }
}

module displayHolder() {
  color("LightBlue") {
    rotate([90, 0, 90]) {
      union() {
        for (i=[0:1]) {
          for (j=[0:1]) {
            intersection() {
              cube(size=[displayPcbWidth,displayPcbHeight,gunWallThickness], center=false);  
              translate([displayPcbWidth * i, displayPcbHeight * j, 0]) {
                cylinder(r=displayHolderPoleWidth, h=gunWallThickness, center=false);    
              }
            }
          }
        }
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

module speakerHolderTop() {
  color("Orange") {    
    cylinder(d=speakerHolderDia, h=speakerHolderWallThickness, center=false);
    translate([0, 0, speakerHolderWallThickness]) {
      cylinder(d=speakerDiameter, h=speakerHolderTopHeight, center=false);
    }

    translate([- speakerHolderDia / 2 - speakerHolderScrewDia / 2, 0, 0]) {
      speakerHolderScrewPole(speakerHolderWallThickness);
    }

    translate([speakerHolderDia / 2 + speakerHolderScrewDia / 2, 0, 0]) {
      speakerHolderScrewPole(speakerHolderWallThickness  );
    }    
  }
}

module speakerHolder() { 
  color("OrangeRed") {
    translate([speakerHolderDia / 2 + speakerHolderScrewPoleDia / 2, speakerHolderDia / 2 + speakerHolderScrewPoleDia / 2, 0]) { 
        difference() {
        cylinder(d=speakerHolderDia, h=speakerHolderHeight, center=false);
        cylinder(d=speakerDiameter, h=speakerHolderHeight,center=false);
      }
  
      translate([- speakerHolderDia / 2 - speakerHolderScrewDia / 2, 0, 0]) {
        speakerHolderScrewPole(speakerHolderHeight);
      }
  
      translate([speakerHolderDia / 2 + speakerHolderScrewDia / 2, 0, 0]) {
        speakerHolderScrewPole(speakerHolderHeight);
      }
    }
  }
}

module speakerHolderScrewPole(poleHeight) {
  difference() {
    cylinder(d=speakerHolderScrewPoleDia, h=poleHeight, center=false);  
    translate([0,0,poleHeight - speakerHolderScrewHeight]) {
      cylinder(d=speakerHolderScrewDia, h=speakerHolderScrewHeight, center=false);  
    }
  }
}

module speakerGrill() {
  numberOfBarsToAdd = floor(speakerDiameter / (speakerGrillBarHeight * 2));  
  
  color("OrangeRed") {
      translate([speakerDiameter / 2, speakerDiameter / 2, 0]) {
      union() {
        for (i=[0:numberOfBarsToAdd]) {
          intersection() {
            cylinder(d=speakerDiameter, h=gunWallThickness, center=false);
            translate([-speakerDiameter / 2, -speakerDiameter / 2 + i * numberOfBarsToAdd, 0]) {
              cube(size=[speakerDiameter, speakerGrillBarHeight, gunWallThickness], center=false);  
            }
          }  
        }
      }  
    }
  }
}


module trigger() {
  color("Khaki") {
    difference() {
      cube(size=[triggerFrontLength, triggerHeight, triggerThickness], center=false);
      translate([- triggerHeight / 5, triggerHeight / 2, 0]) {
        cylinder(d=triggerHeight, h=triggerThickness, center=false);  
      }
    }

    translate([triggerFrontLength, 0, 0]) {
      
      // trigger back
      difference() {
        cube(size=[triggerBackLength, triggerHeight, triggerThickness], center=false);

        hull() {
          translate([triggerPoleDia / 2, triggerPoleDia / 2 + (triggerHeight - triggerPoleDia) / 2, 0]) {
            cylinder(d=triggerPoleRailDia, h=triggerThickness, center=false); 

            translate([triggerBackLength - triggerPoleRailDia - triggerPoleRailFlesh, 0, 0]) {
              cylinder(d=triggerPoleRailDia, h=triggerThickness, center=false);   
            }
          }
        }
      }
            
      // spring pin
      translate([triggerBackLength, triggerHeight / 2, triggerThickness / 2]) {
        rotate([0, 90,0]) {
          cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);    
        }  
      }
    }
  }
}


module triggerGuidance() {  
  color("Moccasin") {
    difference() {
      cube(size=[triggerGuidanceLength, triggerGuidanceHeight, triggerGuidanceThickness], center=false);

      translate([0, triggerGuidanceWallThickness + triggerGuidanceFlesh / 2, triggerGuidanceThickness - triggerThickness - triggerGuidanceFlesh]) {
        cube(size=[triggerBackLength + triggerSpringPinLength + triggerSpringSpace, triggerHeight + triggerGuidanceFlesh, triggerThickness + triggerGuidanceFlesh], center=false);   
      }      
    }
    
    // add spring pole
    translate([triggerGuidanceLength - triggerSpringPinLength * 2 - triggerGuidanceWallThickness, triggerGuidanceHeight / 2, triggerGuidanceThickness - triggerThickness - triggerGuidanceFlesh + triggerSpringPinDia / 2 + triggerGuidanceFlesh / 2]) {
      rotate([0, 90, 0]) {
        cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);  
      }
    }

    // add trigger pole
    translate([triggerPoleDia / 2, triggerGuidanceHeight / 2, triggerGuidanceThickness - triggerThickness -  triggerGuidanceFlesh]) {
      difference() {
        cylinder(d=triggerPoleDia, h=triggerThickness + triggerGuidanceFlesh, center=false);
        cylinder(d=triggerPoleScrewDia, h=triggerThickness + triggerGuidanceFlesh, center=false);
      }
    }  
  }  
}

module renderAll() {
  translate([-100, 0, 0]) {
    speakerHolderTop();
  }

 
  difference() {
    gunBody();

    // add speaker grill    
    /*speakerGrillHolderOffset =  speakerHolderScrewPoleDia / 2 + speakerHolderWallThickness;
    translate([gunWallThickness + gunFrontLength + speakerGrillHolderOffset, (gunBackHeight - speakerHolderDia) / 2 + speakerGrillHolderOffset, 0]) {
      speakerGrill();
    }*/

    // cut out grip opening
    translate([gripFrontOffset + gunWallThickness, 0, gunWallThickness]) {
      cube(size=[gripWidth - 2 * gunWallThickness, gunWallThickness + 20, gunBottomThickness - gunWallThickness], center=false);
    }

    // cut out the display
    translate([gunFrontLength, gunHeight - displayPcbHeight - gunWallThickness, (gunBottomThickness - displayPcbWidth) / 2]) {
      cube(size=[gunWallThickness, displayPcbHeight, displayPcbWidth], center=false);
    }
  }

  
  // add esp32 standoff
  translate([gunFrontLength - gunWallThickness - esp32StandoffLength,gunWallThickness + 2,0]) {
    esp32Standoff();
  }

  // add speaker holder
  translate([gunWallThickness + gunFrontLength, (gunBackHeight - speakerHolderDia) / 2, gunWallThickness]) {
    speakerHolder();
  }
  
  // add grip
  difference() {
    translate([gripFrontOffset, -gripHeight + gripCornerRadius * 2, 0]) {    
      gripBody();      
    }    

    // cut out trigger hole    
    translate([gunFrontLength - 15,  - (triggerHeight + triggerGuidanceFlesh), (gunBottomThickness - (triggerThickness + triggerGuidanceFlesh)) / 2]) {
      cube(size=[20, triggerHeight + triggerGuidanceFlesh, triggerThickness + triggerGuidanceFlesh], center=false);  
    }
  }

  // add trigger
  translate([gunFrontLength - triggerFrontLength , - (triggerHeight + triggerGuidanceFlesh / 2), (gunBottomThickness - (triggerThickness - triggerGuidanceFlesh / 2)) / 2]) {
    trigger();
  }
  
  // add display holder
  translate([gunFrontLength, gunHeight - displayPcbHeight - gunWallThickness, (gunBottomThickness - displayPcbWidth) / 2]) {
    displayHolder();  
  }
  
  // add gun pole positions
  for (i=gunBodyConPolPositions) {
    translate([i[0], i[1], gunWallThickness]) {
      gunBodyConPole();
    }
  }
}

/*triggerGuidance();
translate([- triggerFrontLength - triggerBackLength + triggerPoleRailFlesh + triggerSpringPinLength + triggerPoleDia, triggerGuidanceWallThickness + triggerGuidanceFlesh, triggerGuidanceThickness - triggerThickness - triggerGuidanceFlesh / 2]) {
  trigger();  
}*/


renderAll();