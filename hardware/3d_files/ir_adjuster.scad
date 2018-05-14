$fn=25;

tubeInnerDia=40;
tubeOuterDia=43;

ledHolderThickness=3;
ledHolderThinner=1;
ledHolderDia=tubeInnerDia - ledHolderThinner;

backThickness=10;
backInnerThickness=5;

cableHoleDia=3;

screwDia=3;
screwOffset=4;

irLedDia=3;
flashLedDia=3;
flashLedOffset=5;


nutOuterSize=6;
nutHeight=3;
nutPocketWidth=nutOuterSize + 2;
nutPocketHeight=nutHeight +3;

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
      cube([nutPocketWidth / 2, screwDia * 2, nutHeight], center=true);
    } 
        
    // screw hole
    cylinder(d=screwDia, h=nutHeight, nutPocketHeight);  
      
  }
}

//drawNutPocket();

drawLedHolder();

//drawBack();