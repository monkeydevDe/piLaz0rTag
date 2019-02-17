/**
* Tagger which can be printed.
* All dimensions are in millimeters
*/


include <config.scad>

include <trigger.scad>


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
      cube(size=[gunWallThickness, displayPcbWidth + gunWallThickness, gunBottomThickness], center=false);     
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

        // cut out the reload button
        translate([-gripCornerRadius + (gripWidth - reloadButtonHeight - reloadBtnGuidanceTolerance) / 2 , -gripCornerRadius, -gripCornerRadius + (gunBottomThickness - reloadButtonThickness - reloadBtnGuidanceTolerance) / 2]) {
          cube([reloadButtonHeight + reloadBtnGuidanceTolerance,gunWallThickness+gripCornerRadius,reloadButtonThickness+reloadBtnGuidanceTolerance], center=false);  
        }
        
      }

      // add reload button pole  
      translate([-gripCornerRadius + (gripWidth - reloadBtnGuidanceHeight) / 2, -gripCornerRadius + gunWallThickness, -gripCornerRadius + gunWallThickness]) { 
        translate([reloadBtnGuidanceHeight, 0, (gunBottomThickness -gripCornerRadius) / 2 - reloadBtnGuidanceThickness / 2]) {
          rotate([0, 0, 90]) {              
            reloadButtonGuidance();  
            
            translate([- reloadButtonFrontLength - buttonBackLength + buttonPoleRailFlesh + triggerSpringPinLength + buttonPoleDia,  reloadBtnGuidanceWallThickness + reloadBtnGuidanceTolerance / 2, reloadBtnGuidanceBottomThickness + reloadBtnGuidanceTolerance / 2]) {
              reloadButton();  
            }
            
          }  
        }  

        cube(size=[reloadBtnGuidanceHeight,reloadBtnGuidanceLength, (gunBottomThickness -gripCornerRadius) / 2 - reloadBtnGuidanceThickness / 2], center=false);
      }
      
      
    } // eo of rotate
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
    pcbStandOff(esp32Length, 
      esp32Height,
      esp32StandoffBaseHeight,
      esp32StandoffHoles,
      esp32StandoffPoles,
      esp32StandoffBaseSpace,
      esp32StandoffScrewHolderDia,
      esp32StandoffScrewHoleDia);
  }  
}

module vibratrionStandoff() {
  color([255/255, 0, 0]) {
    pcbStandOff(vibrationPcbWidth, 
      vibrationPcbHeight,
      vibrationStandoffBaseHeight,      
      vibrationStandoffHoles,
      vibrationStandoffPoles,
      vibrationStandoffBaseSpace,
      vibrationStandoffScrewHolderDia,
      vibrationStandoffScrewHoleDia);
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


module pcbWallCutOut(rot,width,height,thickness, poleWidth,screwDia, screwOffset) {
  rotate(rot) {
    union() {
      for (i=[0:1]) {
        for (j=[0:1]) {
          intersection() {
            cube(size=[width,height,thickness], center=false);  
            translate([width * i, height * j, 0]) {
              difference() {
                cylinder(r=poleWidth, h=thickness, center=false);                                                  
                translate([(screwDia / 2) + screwOffset - i * (2 * screwOffset + screwDia),(screwDia / 2) + screwOffset - j * (2 * screwOffset + screwDia), 0]) {
                  cylinder(d=screwDia, h=thickness, center=false);                    
                }
              }
            }              
          }
        }
      }
    }
  }
}

module displayHolder() {
  color("LightBlue") {
    pcbWallCutOut([90, 0, 90],
        displayPcbWidth,
        displayPcbHeight,
        gunWallThickness, 
        displayHolderPoleWidth,
        displayHolderScrewDia, 
        displayHolderScrewOffset);
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


/**
* Holder for the ir receiver pcb
*/
module irReceiverHolder() {
  color("DarkKhaki") {
    pcbWallCutOut(receiverHolderRotation,
        receiverPcbWidth,
        receiverPcbHeight,
        gunWallThickness, 
        receiverHolderPoleWidth,
        receiverHolderScrewDia, 
        receiverHolderScrewOffset);
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

    // cut out receiver holder
    translate([gunWallThickness + lensTubeFixWidth + gunBodyConPoleWidth , gunHeight, (gunBottomThickness - receiverPcbWidth) / 2]) {
      rotate(receiverHolderRotation) {
        cube(size=[ receiverPcbWidth,receiverPcbHeight,gunWallThickness], center=false);  
      }
    }
  }

  
  // add esp32 standoff
  translate([gunFrontLength - gunWallThickness - esp32Length,gunWallThickness + 2,0]) {
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
    translate([gunFrontLength - 15,  - (triggerHeight + triggerGuidanceTolerance), (gunBottomThickness - (triggerThickness + triggerGuidanceTolerance)) / 2]) {
      cube(size=[20, triggerHeight + triggerGuidanceTolerance, triggerThickness + triggerGuidanceTolerance], center=false);  
    }
  }

  // add trigger
  translate([gunFrontLength - triggerFrontLength , - (triggerHeight + triggerGuidanceTolerance / 2), (gunBottomThickness - (triggerThickness - triggerGuidanceTolerance / 2)) / 2]) {
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

  // add receiver holder
  translate([gunWallThickness + lensTubeFixWidth + gunBodyConPoleWidth , gunHeight, (gunBottomThickness - receiverPcbWidth) / 2]) {
    irReceiverHolder();  
  }

  // add vibration motor holder
  rotate_about_pt([0,0, gripAngle],[vibrationPcbWidth / 2,vibrationPcbHeight / 2,0]) {
    translate([gripFrontOffset, - gripHeight - gripHeight / 4, 0]) {    
      vibratrionStandoff();    
    }
  }
}


//render() {
  //gripBody();      
//}

reloadDebug();

//triggerDebug();


//renderAll();

//receiverHolder();


//esp32Standoff();