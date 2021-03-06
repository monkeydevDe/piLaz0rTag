
/**
* button
*/
module button(height,frontLength,thickness,curved) {
  color("Khaki") {
    difference() {
      cube(size=[frontLength, height, thickness], center=false);
      if(curved) {
        translate([- height / 5, height / 2, 0]) {
          cylinder(d=height, h=thickness, center=false);  
        }
      }
    }
    translate([frontLength, 0, 0]) {
      buttonBack(height,buttonBackLength,reloadButtonThickness, buttonPoleDia, buttonPoleTolerance, buttonPoleRailFlesh);
    }
  }
}


/**
* The back part of a button
*/
module buttonBack(height,length,thickness, poleDia, poleTolerance, poleRailFlesh) {

  poleRailDia=poleDia+poleTolerance;

  // trigger back
  difference() {
    cube(size=[length, height, thickness], center=false);

    // hole for the pole off the guidance    
    hull() {
      translate([poleDia / 2, poleDia / 2 + (height - poleDia) / 2, 0]) {
        cylinder(d=poleRailDia, h=thickness, center=false); 
        translate([length - poleRailDia - poleRailFlesh, 0, 0]) {
          cylinder(d=poleRailDia, h=thickness, center=false);   
        }
      }
    }
  }
            
  // trigger pin
  translate([length, height / 2, thickness / 2]) {
    rotate([0, 90,0]) {
      cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);    
    }  
  }

  // spring pin
  translate([length, height - (triggerSpringPinDia / 2), thickness / 2]) {
    rotate([0, 90,0]) {
      cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);    
    }  
  }
}

/**
* Guidance part of a button
*/
module buttonGuidance(wallThickness,tolerance,length,height, bottomThickness, thickness, poleDia, poleScrewDia) {  
  color("Moccasin") {

    cutoutLength=length - wallThickness;
    cutoutHeight = height - 2 * wallThickness;
    cutoutThickness = thickness + tolerance;

    difference() {
      cube(size=[length, height, thickness], center=false);
      translate([0, wallThickness + tolerance / 2, bottomThickness]) {
        cube(size=[cutoutLength, cutoutHeight, cutoutThickness + tolerance], center=false);   
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
    translate([length - triggerSpringPinLength - wallThickness, height - triggerSpringPinDia, bottomThickness + (thickness + tolerance) / 2 ]) {
      rotate([0, 90, 0]) {
        cylinder(d=triggerSpringPinDia, h=triggerSpringPinLength, center=false);  
      }
    }

    // add trigger pole
    poleHeight = thickness -  bottomThickness - tolerance;
    translate([poleDia / 2, (height + tolerance) / 2, bottomThickness]) {
      difference() {
        cylinder(d=poleDia, h=poleHeight, center=false);
        cylinder(d=poleScrewDia, h=poleHeight, center=false);
      }
    }
  }  
}

/**
* Generates the screw holes for screwing the guidance at the pole
*/
module buttonFixScrewHoles(screwHeadTopDia,screwHeadBottompDia,headHeight,screwPositions) {
  for (screwPosition=screwPositions) {
    translate([screwPosition[0], screwPosition[1], 0]) {
      cylinder(d1=screwHeadBottompDia,d2=screwHeadTopDia, h=headHeight, center=false);
    }
  }
}

/**
* Generates the holes for screwing the guidance at the pole in the pole
*/
module buttonFixScrewPoleHoles(screwDia,screwHeight,screwPositions) {
  for (screwPosition=screwPositions) {
    translate([screwPosition[0], screwPosition[1], 0]) {
      cylinder(d=screwDia, h=screwHeight, center=false);
    }
  }
}

/**
* The triggerguidance
*/
module triggerGuidance() {
  difference() {
    buttonGuidance(triggerGuidanceWallThickness,
      triggerGuidanceTolerance,
      triggerGuidanceLength,
      triggerGuidanceHeight,
      triggerGuidanceBottomThickness,
      triggerGuidanceThickness,
      buttonPoleDia,
      buttonPoleScrewDia);

      buttonFixScrewHoles(btnGuidanceFixScrewHeadTopDia,
        btnGuidanceFixScrewHeadBottompDia,        
        triggerGuidanceBottomThickness,
        triggerGuidanceFixScrewPositions);
  }    
}

/**
* The trigger
*/
module trigger() {  
  button(triggerHeight,triggerFrontLength, triggerThickness, true);  
}

/**
* The reload button guidance
*/
module reloadButtonGuidance() { 
  difference() { 
    buttonGuidance(reloadBtnGuidanceWallThickness,
      reloadBtnGuidanceTolerance,
      reloadBtnGuidanceLength,
      reloadBtnGuidanceHeight,
      reloadBtnGuidanceBottomThickness,
      reloadBtnGuidanceThickness,
      buttonPoleDia,
      buttonPoleScrewDia);

    buttonFixScrewHoles(btnGuidanceFixScrewHeadTopDia,
      btnGuidanceFixScrewHeadBottompDia,      
      reloadBtnGuidanceBottomThickness,
      reloadBtnGuidanceFixScrewPositions);
  }
}

/**
* The reload button
*/
module reloadButton() {  
  button(reloadButtonHeight,reloadButtonFrontLength, reloadButtonThickness, false);  
}

// used for debugging the trigger
module triggerDebug() {
  render(){
    triggerGuidance();
    translate([- triggerFrontLength - buttonBackLength + buttonPoleRailFlesh + triggerSpringPinLength + buttonPoleDia, triggerGuidanceWallThickness + triggerGuidanceTolerance, triggerGuidanceThickness - triggerThickness - triggerGuidanceTolerance / 2]) {
      //trigger();  
    }  
  }
}

// used for debugging the reload button
module reloadDebug() {
  render() {
    reloadButtonGuidance();
    translate([- reloadButtonFrontLength - buttonBackLength + buttonPoleRailFlesh + triggerSpringPinLength + buttonPoleDia, reloadBtnGuidanceWallThickness + reloadBtnGuidanceTolerance, reloadBtnGuidanceThickness - reloadButtonThickness - reloadBtnGuidanceTolerance / 2]) {
      reloadButton();
    }  
  }
}