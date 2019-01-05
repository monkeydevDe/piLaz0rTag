/**
* Tagger which can be printed.
* All dimensions are in millimeters
*/




// lens tube dims
lensTubeDiameter=45;
lensTubeLength=200;

// lens tube fixiations dims 
lensTubeFixWidth=10;
lensTubeFixFlesh=10;
lensTubeFixHeight=lensTubeDiameter + 2 * lensTubeFixFlesh;
lensTubeGap=1.5;

// pcb parameters
esp32Height=30;
displayWidth=10;
displayHeight=30;
displayThickness=10;




// gun parameters
gunWallThickness=3;
gunHeight=lensTubeFixHeight + esp32Height;
gunFrontLength = lensTubeLength + 10;
gunBackLength = 150 + displayThickness;
gunThickness = lensTubeDiameter + 30;
gunHalfThickness = gunThickness / 2;

// grip parameters
gripWidth=70;
gripHeight=100;
gripFrontOffset=200;
gripCornerRadius=5;


/**
* Fixiation for the lens tube
*/
module lensTubeFixiation() {
  difference() {
    cube(size=[lensTubeFixWidth, lensTubeFixHeight, lensTubeFixHeight], center=false);     
    translate([0, lensTubeFixHeight / 2, lensTubeFixHeight / 2]) {
      rotate([0, 90, 0]) {
        cylinder(d=lensTubeDiameter, h=lensTubeFixWidth, center=false);    
      }  
    }

    // cut of the top
    offset = lensTubeFixHeight / 2 - lensTubeGap / 2;
    translate([0, 0, offset]) {
      cube(size=[lensTubeFixWidth, lensTubeFixHeight, lensTubeFixHeight / 2 + lensTubeGap / 2], center=false);
    }
  }
}

module gunBodyFront() {
  difference() {    
    cube(size=[gunFrontLength, gunHeight, gunHalfThickness], center=false);
    translate([gunWallThickness, gunWallThickness, gunWallThickness]) {
      cube(size=[gunFrontLength -  gunWallThickness, gunHeight - gunWallThickness * 2,gunHalfThickness - gunWallThickness ], center=false);
    }
  }
}

module gunBodyBack() {
  gunBackHeight =  gunHeight - displayHeight;
  union() {
    difference() {
      cube(size=[gunBackLength, gunBackHeight, gunHalfThickness], center=false);
      translate([0, gunWallThickness, gunWallThickness]) {
        cube(size=[gunBackLength - gunWallThickness, gunBackHeight - gunWallThickness * 2, gunHalfThickness - gunWallThickness], center=false);      
      }
    }
    
    // display part  
    translate([0, gunBackHeight, 0]) {
        cube(size=[gunWallThickness, displayHeight, gunHalfThickness], center=false);     
    }
    
  
  }
}

module gripBody() {
  translate([gripCornerRadius, gripCornerRadius, gripCornerRadius]) {  
    difference() {
      minkowski() {
        cube(size=[gripWidth - 2 * gripCornerRadius , gripHeight - gripCornerRadius, gunHalfThickness -  gripCornerRadius], center=false);
        sphere(r=gripCornerRadius);
      }

      translate([gunWallThickness, gunWallThickness, gunWallThickness]) {
        minkowski() {
          cube(size=[gripWidth - 2 * gripCornerRadius - 2 * gunWallThickness , gripHeight - gripCornerRadius - 2 * gunWallThickness , gunHalfThickness -  gripCornerRadius], center=false);
          sphere(r=gripCornerRadius);
        }
      }


      // cut off the top
      translate([-gripCornerRadius, - gripCornerRadius, gunHalfThickness - gripCornerRadius]) {
        cube(size=[gripWidth, gripHeight + gripCornerRadius, gripCornerRadius], center=false);
      }

      // cut of the cap
      translate([-gripCornerRadius, gripHeight - gripCornerRadius * 2, -gripCornerRadius]) {
        cube(size=[gripWidth,  gripCornerRadius * 2, gunHalfThickness], center=false);
      }     
    }
  }
}

module gunBody() {
  union() {
    difference() {
      gunBodyFront();
      tubeHoleOffset = gunHeight - lensTubeDiameter / 2 - lensTubeFixFlesh -gunWallThickness;
      //echo(str("Variable = ", gunHeight - lensTubeDiameter / 2 - lensTubeFixFlesh -gunWallThickness));
      translate([0,tubeHoleOffset, lensTubeDiameter / 2 + lensTubeFixFlesh + gunWallThickness]) {
        rotate([0, 90, 0]) {
          #cylinder(d=lensTubeDiameter, h=gunWallThickness, center=false);
        }  
      }
      
    }

    translate([gunWallThickness, gunHeight - lensTubeFixHeight - gunWallThickness, gunWallThickness ]) {
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


difference() {
  gunBody();
  translate([gripFrontOffset + gunWallThickness, 0, gunWallThickness]) {
    #cube(size=[gripWidth - 2 * gunWallThickness, gunWallThickness, gunHalfThickness - gunWallThickness], center=false);
  }
}

translate([gripFrontOffset, -gripHeight + gripCornerRadius, 0]) {
  gripBody();    
}









//lensTubeFixiation();