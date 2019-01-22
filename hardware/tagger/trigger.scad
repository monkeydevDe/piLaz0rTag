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
module buttonGuidance(wallThickness,tolerance,length,height, bottomThickness, thickness) {  
  color("Moccasin") {

    cutoutLength=length - wallThickness;
    cutoutHeight = height - 2 * wallThickness;
    cutoutThickness = thickness + tolerance;

    difference() {
      cube(size=[length, height, thickness], center=false);
      translate([0, wallThickness + tolerance / 2, bottomThickness]) {
        cube(size=[cutoutLength, cutoutHeight, triggerThickness + tolerance], center=false);   
      }      

      // add cutout and holes for the micro switch
      translate([length - microSwitchWidth, 0, bottomThickness]) {
        cube(size=[microSwitchWidth, microSwitchHeight, thickness - bottomThickness], center=false);

        translate([microSwitchScrewHoleDia / 2 + microSwitchWidth - microSwitchScrewHoleDia - microSwitchScrewHoleBackOffset, microSwitchScrewHoleDia / 2 + microSwitchScrewHoleHeightOffset, -microSwitchScrewHolesHeight]) {
          cylinder(d=microSwitchScrewHoleDia, h=microSwitchScrewHolesHeight, center=false);  
          translate([0, microSwitchScrewHoleDia + microSwitchScrewHolesOffset, 0]) {
            cylinder(d=microSwitchScrewHoleDia, h=microSwitchScrewHolesHeight, center=false);    
          }
        } 
      }
    }
    
    // add spring pole
    translate([length - triggerSpringPinLength - wallThickness, height - triggerSpringPinDia, bottomThickness + (triggerThickness + tolerance) / 2 ]) {
      rotate([0, 90, 0]) {
        cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);  
      }
    }

    // add trigger pole
    translate([triggerPoleDia / 2, (height + tolerance) / 2, bottomThickness]) {
      difference() {
        cylinder(d=triggerPoleDia, h=triggerThickness, center=false);
        cylinder(d=triggerPoleScrewDia, h=triggerThickness, center=false);
      }
    }
  }  
}


// used for debugging the trigger
module triggerDebug() {
  render(){
    buttonGuidance(triggerGuidanceWallThickness,
      triggerGuidanceTolerance,
      triggerGuidanceLength,
      triggerGuidanceHeight,
      triggerGuidanceBottomThickness,
      triggerGuidanceThickness);
    translate([- triggerFrontLength - triggerBackLength + triggerPoleRailFlesh + triggerSpringPinLength + triggerPoleDia, triggerGuidanceWallThickness + triggerGuidanceTolerance, triggerGuidanceThickness - triggerThickness - triggerGuidanceTolerance / 2]) {
      trigger();  
    }
  }
}

// used for debugging the reload button
module reloadDebug() {
  render() {
    buttonGuidance(reloadBtnGuidanceWallThickness,
      reloadBtnGuidanceTolerance,
      reloadBtnGuidanceLength,
      reloadBtnGuidanceHeight,
      reloadBtnGuidanceBottomThickness,
      reloadBtnGuidanceThickness);
  }
}