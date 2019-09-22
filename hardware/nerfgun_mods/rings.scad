bigRingRadius=50;
bigRingHeight=70;


outerWidth=10;

smallRingRadius=20;
smallRingOffset=bigRingRadius + smallRingRadius + 10;
smallRingHeight=20;



$fn=100;


difference() {
  hull() {
    difference() {
      cylinder(r1=bigRingRadius + outerWidth * 2, r2=bigRingRadius,  h=bigRingHeight, center=false);    
    }
    translate([smallRingOffset, 0, 0]) {
      cylinder(r=smallRingRadius + outerWidth * 2, h=smallRingHeight, center=false);  
    }  
  }

  cylinder(r=bigRingRadius, h=bigRingHeight, center=false);
  translate([smallRingOffset, 0, 0]) {
      cylinder(r=smallRingRadius, h=bigRingHeight, center=false);  
    }  
}