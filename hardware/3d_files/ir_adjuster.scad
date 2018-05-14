$fn=100;

tubeInnerDia=36;
tubeOuterDia=40;

ledHolderThickness=3;
ledHolderThinner=1;
ledHolderDia=tubeInnerDia - ledHolderThinner;

backThickness=5;
backInnerThickness=3;

cableHoleDia=5;

screwDia=4.4;
screwOffset=6;

irLedDia=5.2;
flashLedDia=5.2;
flashLedOffset=5;


nutOuterSize=8.1;
nutHeight=4;
nutPocketWidth=nutOuterSize + 2;
nutPocketHeight=nutHeight + 1.5;

// draw the back holder
module drawBack()  {
  difference() {
    // draw the main cylinder     
    cylinder(h=backThickness, d=tubeOuterDia);
   
    // create ring for cutout
    difference() {
      cylinder(h=backInnerThickness, d=tubeOuterDia);
      cylinder(h=backInnerThickness, d=tubeInnerDia);
    }
  
    // draw hole for cables
    cylinder(h=backThickness, d=cableHoleDia);
  
    // draw hole for screw
    screwHoleXOffset= (tubeOuterDia / 2) - (tubeOuterDia - tubeInnerDia) - screwOffset;
    translate([screwHoleXOffset, 0, 0]) {
      cylinder(h=backThickness, d=screwDia);
    }
  }
}

// craet the led holder
module drawLedHolder() {

 screwHoleXOffset= (tubeOuterDia / 2) - (tubeOuterDia - tubeInnerDia) - screwOffset;

  difference() {
      
    // the plate of the led holder
    cylinder(h=ledHolderThickness, d=ledHolderDia);  
    
    // led hole
    cylinder(h=ledHolderThickness, d=irLedDia);  
    
    // flash led hole
    flashXOffset=  ((ledHolderDia / 2) - flashLedOffset) * -1;
    translate([flashXOffset, 0, 0]) {
        cylinder(h=ledHolderThickness, d=flashLedDia);  
    }
    
    // screw hole
    translate([screwHoleXOffset, 0, 0]) {
      cylinder(h=backThickness, d=screwDia);
    }
  }
  
  // nut pocket
  translate([screwHoleXOffset, 0, nutPocketHeight / 2]) {
    drawNutPocket();
  }
}


// draw the pocket for the nut
module drawNutPocket() {
  difference() {
    
    translate([0 ,0, nutPocketHeight / 2]) {
      cube([nutPocketWidth, nutPocketWidth, nutPocketHeight], center=true);
    }    
    
    // nut shape  
    cylinder(d=nutOuterSize, h=nutHeight, $fn=6);  
    
    // hollow so we cann insert the nut
    translate([nutPocketWidth / 3, 0, nutHeight / 2]) {
      cube([nutPocketWidth / 2, nutOuterSize-1.1, nutHeight], center=true);
    } 
        
    // screw hole
    cylinder(d=screwDia, h=nutHeight, nutPocketHeight);  
      
  }
}

//drawNutPocket();

//drawBack();

drawLedHolder();