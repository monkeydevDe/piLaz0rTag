/**
* Tagger which can be printed.
* All dimensions are in millimeters
*/




// lens tube dims
lensTubeDiameter=45;
lensTubeLength=200;

// lens tube fixiations dims 
lensTubeFixWidth=10;
lensTubeFixHeight=lensTubeDiameter + 2 * 5;

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
gripWidth=80;
gripHeight=100;
gripFrontOffset=200;


/**
* Fixiation for the lens tube
*/
module lensTubeFixiation() {
  difference() {
    cube(size=[lensTubeFixWidth, lensTubeFixHeight, lensTubeFixHeight], center=true);     
    rotate([0, 90, 0]) {
      cylinder(d=lensTubeDiameter, h=10, center=true);    
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
  minkowski() {
    cube(size=[gripWidth, gripHeight, gunHalfThickness], center=false);
    cylinder(r=20, h=gunHalfThickness, center=false);  
  }
  
}

module gunBody() {
  union() {
    gunBodyFront();

    translate([gunFrontLength, 0, 0]) {
      gunBodyBack();   
    }
  }
}

gunBody();

gripBody();







//lensTubeFixiation();