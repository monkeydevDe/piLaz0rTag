bigRingRadius=20.25;
bigRingHeight=40;


outerWidth=5;

smallRingRadius=10;
smallRingOffset=bigRingRadius + smallRingRadius +  2;
smallRingHeight=20;


railTopOffset=2;
railWidth=10;
railHeight=5;
railLowerHeight=5;
railLowerWidth=5;

railFixDepth=10;




railFixHeight=railTopOffset + railHeight + railLowerHeight;
railFixWidth=railWidth + 4;



$fn=100;


difference() {

  // create the connector

  // create the hull
  hull() {    

    /*translate([- (bigRingRadius + outerWidth + 40), -0.5, 0]) {
      cube(size=[1, 1, bigRingHeight], center=false);  
    }*/
    

    cylinder(r1=bigRingRadius + outerWidth * 2, r2=bigRingRadius,  h=bigRingHeight, center=false);    
    
    translate([smallRingOffset, 0, 0]) {
      cylinder(r=smallRingRadius + outerWidth * 2, h=smallRingHeight, center=false);  
    }  
  }

  // cutout the holes
  cylinder(r=bigRingRadius, h=bigRingHeight, center=false);
  translate([smallRingOffset, 0, 0]) {
      cylinder(r=smallRingRadius, h=bigRingHeight, center=false);  
    }  
}

translate([-bigRingRadius - outerWidth * 2, -railFixWidth / 2, -railFixDepth]) {
  difference() {
    cube(size=[railFixHeight, railFixWidth, railFixDepth], center=false);  
    translate([railTopOffset, (railFixWidth - railWidth) / 2, 0]) {
      cube(size=[railHeight, railWidth, railFixHeight], center=false);  
      translate([railLowerHeight, railLowerWidth / 2, 0]) {
        cube(size=[railLowerHeight, railLowerWidth, railFixDepth], center=false); 
      }
    }
  }
}
