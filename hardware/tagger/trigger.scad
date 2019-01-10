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
            
      // trigger pin
      translate([triggerBackLength, triggerHeight / 2, triggerThickness / 2]) {
        rotate([0, 90,0]) {
          cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);    
        }  
      }

      // spring pin
      translate([triggerBackLength, triggerHeight - (triggerSpringPinDia / 2), triggerThickness / 2]) {
        rotate([0, 90,0]) {
          cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);    
        }  
      }
    }
  }
}

/**
* Guidance part of the trigger
*/
module triggerGuidance() {  
  color("Moccasin") {
    difference() {
      cube(size=[triggerGuidanceLength, triggerGuidanceHeight, triggerGuidanceThickness], center=false);
      translate([0, triggerGuidanceWallThickness + triggerGuidanceFlesh / 2, triggerGuidanceBottomThickness]) {
        cube(size=[triggerBackLength + 2* triggerSpringPinLength + triggerSpringSpace, triggerHeight + triggerGuidanceFlesh, triggerThickness + triggerGuidanceFlesh], center=false);   
      }      

      // add cutout and holes for the trigger switch
      translate([triggerGuidanceLength - triggerSwitchWidth, 0, triggerGuidanceBottomThickness]) {
        cube(size=[triggerSwitchWidth, triggerSwitchHeight, triggerGuidanceThickness - triggerGuidanceBottomThickness], center=false);

        translate([triggerSwitchScrewHoleDia / 2 + triggerSwitchWidth - triggerSwitchScrewHoleDia - triggerSwitchScrewHoleBackOffset, triggerSwitchScrewHoleDia / 2 + triggerSwitchScrewHoleHeightOffset, -triggerSwitchScrewHolesHeight]) {
          cylinder(d=triggerSwitchScrewHoleDia, h=triggerSwitchScrewHolesHeight, center=false);  
          translate([0, triggerSwitchScrewHoleDia + triggerSwitchScrewHolesOffset, 0]) {
            cylinder(d=triggerSwitchScrewHoleDia, h=triggerSwitchScrewHolesHeight, center=false);    
          }
        } 
      }
    }
    
    // add spring pole
    translate([triggerGuidanceLength - triggerSpringPinLength - triggerGuidanceWallThickness, triggerGuidanceHeight - triggerSpringPinDia, triggerGuidanceBottomThickness + (triggerThickness + triggerGuidanceFlesh) / 2 ]) {
      rotate([0, 90, 0]) {
        cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);  
      }
    }

    // add trigger pole
    translate([triggerPoleDia / 2, (triggerGuidanceHeight + triggerGuidanceFlesh) / 2, triggerGuidanceBottomThickness]) {
      difference() {
        cylinder(d=triggerPoleDia, h=triggerThickness, center=false);
        cylinder(d=triggerPoleScrewDia, h=triggerThickness, center=false);
      }
    }
  }  
}

// used for debugging the trigger
module triggerDebug() {
  //triggerGuidance();
  translate([- triggerFrontLength - triggerBackLength + triggerPoleRailFlesh + triggerSpringPinLength + triggerPoleDia, triggerGuidanceWallThickness + triggerGuidanceFlesh, triggerGuidanceThickness - triggerThickness - triggerGuidanceFlesh / 2]) {
    trigger();  
  }
}