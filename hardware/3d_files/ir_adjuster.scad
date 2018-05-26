$fn=200;

tubeInnerDia=36;
tubeOuterDia=40;

lensHolderOuterDia = tubeOuterDia + 4;
lensDia = 36;
lensHeight = 1.5;
lensOutlineDia = lensDia - 3;
lensOutlineHeight = 2; 

lensRingHeight = 2;
lensRingDia=40;
lensRingDiaThinner=0.2;

lensHolderOuterHeight= lensHeight +  lensOutlineHeight + lensRingHeight;
lensHolderInnerHeight=5;
lensHolderInnerWallWidth=1;

ledHolderHeight=3;
ledHolderThinner=1;
ledHolderDia=tubeInnerDia - ledHolderThinner;
ledFixPlateHeight=1;
ledFixScrewDia=3.3;
ledFixScrewOffset=3;

backHeight=5;
backInnerHeight=3;

cableHoleDia=5;

screwDia=4.4;
screwOffset=6;

ledDia=5.2;
ledRingHeight=1.3;
ledRingDia=6.4;
flashLedOffset=5;


nutOuterSize=9.1;
nutHeight=4;
nutPocketWidth=nutOuterSize + 1.9;
nutPocketHeight=nutHeight + 1.5;

screwHoleXOffset= (tubeOuterDia / 2) - (tubeOuterDia - tubeInnerDia) - screwOffset;
flashXOffset=  ((ledHolderDia / 2) - flashLedOffset) * -1;

// draw the back holder
module drawBack()  {
  difference() {
    // draw the main cylinder     
    cylinder(h=backHeight, d=tubeOuterDia);
   
    // create ring for cutout
    difference() {
      cylinder(h=backInnerHeight, d=tubeOuterDia);
      cylinder(h=backInnerHeight, d=tubeInnerDia);
    }
  
    // draw hole for led cables
    cylinder(h=backHeight, d=cableHoleDia);
    
    // draw hole for flash led    
    translate([flashXOffset, 0, 0]) {
        cylinder(h=backHeight, d=cableHoleDia);  
    }
  
    // screw hole
    drawScrewHole(backHeight);    
  }
}

// draw the led holder
module drawLedHolder() {

  difference() {
      
    // the plate of the led holder
    cylinder(h=ledHolderHeight, d=ledHolderDia);  
    
    ledRingZOffset = ledHolderHeight - ledRingHeight;
    
    // led hole
    cylinder(h=ledHolderHeight, d=ledDia);  
    translate([0,0,ledRingZOffset]) {
      cylinder(h=ledRingHeight, d=ledRingDia);
    }
    
    // flash led hole    
    translate([flashXOffset, 0, 0]) {
      cylinder(h=ledHolderHeight, d=ledDia);  
      translate([0,0,ledRingZOffset]) {
        cylinder(h=ledRingHeight, d=ledRingDia);
      }
    }
    
    // screw hole
    drawScrewHole(ledHolderHeight);
    
    // fix holes
    drawFixScrewHoles(ledHolderHeight);
  }
  
  // nut pocket
  translate([screwHoleXOffset, 0, nutPocketHeight / 2]) {
    drawNutPocket();
  }
}


// draw the led holder
module drawLedPcbHolder() {



  difference() {
      
    // the plate of the led holder
    cylinder(h=ledHolderHeight, d=ledHolderDia);  
    
    
    pcbWidthY=17;
    pcbWidthX=14;
    pcbHeight=1.5;
    pcbBrim=1;
    pcbBrimHeight = ledHolderHeight-pcbHeight;
    pcbBrimZOffset = (pcbBrimHeight / 2);
    pcbZOffset = (pcbHeight / 2) + (pcbBrimHeight);
  
    translate([-5, 0, pcbBrimZOffset ]) {
      cube([pcbWidthX-pcbBrim,pcbWidthY-pcbBrim,pcbBrimHeight],center=true);
    }
    
    translate([-5, 0, pcbZOffset]) {
      cube([pcbWidthX,pcbWidthY,pcbHeight],center=true);
    }
    
    
    
    
    
    // screw hole
    drawScrewHole(ledHolderHeight);
    
    // fix holes
    drawFixScrewHoles(ledHolderHeight);
  }
  
  // nut pocket
  translate([screwHoleXOffset, 0, nutPocketHeight / 2]) {
    drawNutPocket();
  }
}


// draw the led fixation plate
module drawLedFixationPlate() {
  
  difference() {
    // the main plate for the fixation  
    cylinder(d=ledHolderDia, h=ledFixPlateHeight);
    
    // led hole
    cylinder(d=ledDia, h=ledFixPlateHeight);  
    
    // draw hole for flash led    
    translate([flashXOffset, 0, 0]) {
        cylinder(d=ledDia, h=ledFixPlateHeight);  
    }
    
    // screw hole
    drawScrewHole(ledFixPlateHeight);
    
    // fix holes
    drawFixScrewHoles(ledFixPlateHeight);
  }
  
}

module drawScrewHole(holeHeight) {
  // screw hole
  translate([screwHoleXOffset, 0, 0]) {
    cylinder(h=holeHeight, d=screwDia);
  }
}

// draws the holes for the screws fixaiting the led plate
module drawFixScrewHoles(holeHeight) {
  screwYOffset = (ledHolderDia / 2) - (ledFixScrewDia / 2) - ledFixScrewOffset ;
  
  // right hole  
  translate([0,screwYOffset,0]) {
    cylinder(d=ledFixScrewDia, h=holeHeight);
  }
  
  // left hole
  translate([0,screwYOffset * -1,0]) {
    cylinder(d=ledFixScrewDia, h=holeHeight);
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

// draw the lens holder
module drawLensHolder() {
  totalLensHolderHeight = lensHolderOuterHeight + lensHolderInnerHeight;
  difference() {
    
    // the lens holder body
    cylinder(d=lensHolderOuterDia, h=totalLensHolderHeight);
    
    // cut to fit the inner ring
    difference() {
      cylinder(d=lensHolderOuterDia, h=lensHolderInnerHeight);
      cylinder(d=tubeInnerDia, h=lensHolderInnerHeight);
    }
    
    // hollow the bottom
    cylinder(d=tubeInnerDia - (2 * lensHolderInnerWallWidth),h=lensHolderInnerHeight);
        
    translate([0, 0, lensHolderInnerHeight]) {
      // add lens outline
      cylinder(d=lensOutlineDia, h=lensOutlineHeight);
      
      translate([0, 0, lensOutlineHeight]) {
        // add lens compartment
        cylinder(d=lensDia, h=lensHeight);  
        
        // add lens ring holder
        translate([0, 0, lensHeight]) {
          // add lens compartment
          cylinder(d=lensRingDia, h=lensRingHeight);  
        }
      }
      
    }
  }
}

// draws the ring holding the lens
module drawLensRing() {
  difference() {
    cylinder(d=lensRingDia-lensRingDiaThinner, h=lensRingHeight);
    cylinder(d=lensOutlineDia, h=lensRingHeight);
  }
}




/*drawLensHolder();
translate([lensHolderOuterDia+5,0,0]) {
  drawLensRing();
}*/


translate([0,lensHolderOuterDia+5,0]) {
  //drawBack();

  translate([tubeOuterDia+5,0,0]) {
    //drawLedHolder();
    drawLedPcbHolder();
    
    translate([tubeOuterDia+5,0,0]) {
    //  drawLedFixationPlate();
    }
  }
}