wallWidth=1;
screwDia=3;


bottomHeight=1.5;
pcbWidthX=20;
pcbWidthY=17;
pcbHeight=1.7;
pcbThreashHold=1;
belowPcpSpace=1.7;

cableHoleHeight=2;
cableHoleWidth=5;

fressnellHeight=8;
fressnellWidth=23;
fressnellDia=21.5;

bottomTotalHeight=bottomHeight+pcbHeight+belowPcpSpace+fressnellHeight;

topHeight=2;

cubeTotalWidth=fressnellWidth + 2 * wallWidth + 2 * screwDia;
totalWallWidth = (cubeTotalWidth - fressnellWidth) / 2;

screwOffset = wallWidth + screwDia / 2;

module bottom() {
  difference() {
     cube([cubeTotalWidth,cubeTotalWidth,bottomTotalHeight]);
  
    // cut out below pcb  
    belowWidthX = pcbWidthX- 2 * pcbThreashHold;
    belowXOffset = (cubeTotalWidth - belowWidthX) / 2; 
    belowWidthY = pcbWidthY- 2 * pcbThreashHold;
    belowYOffset = (cubeTotalWidth - belowWidthY) / 2; 
    translate([belowXOffset,belowYOffset ,bottomHeight]) {
      cube([belowWidthX, belowWidthY, belowPcpSpace ]);
    }
  
    // cut out pcb
    pcbXOffset = (cubeTotalWidth - pcbWidthX) / 2;   
    pcbYOffset = (cubeTotalWidth - pcbWidthY) / 2;   
    translate([pcbXOffset,pcbYOffset,bottomHeight + belowPcpSpace]) {
      cube([pcbWidthX, pcbWidthY, pcbHeight]);
    }
  
    // cut out fresnell
    fressnellOffset = (cubeTotalWidth - fressnellWidth) / 2;     
    translate([fressnellOffset,fressnellOffset,bottomHeight + belowPcpSpace + pcbHeight]) {
      cube([fressnellWidth, fressnellWidth, fressnellHeight]);
    }
    
    // cut out cableHole
    cableHoleYOffset = (cubeTotalWidth - cableHoleWidth) / 2;
    cableHolezOffset = bottomTotalHeight - cableHoleHeight;
    translate([0,cableHoleYOffset,cableHolezOffset]) {
      cube([totalWallWidth,cableHoleWidth,cableHoleHeight]);
    }
  }
}

module top() {
  difference() {
    cube([cubeTotalWidth,cubeTotalWidth,topHeight]);
    
    fressnellOffSet =  (cubeTotalWidth - fressnellWidth) / 2 + fressnellWidth / 2;
    translate([fressnellOffSet ,fressnellOffSet ,0]) {
      cylinder(d=fressnellDia, h = topHeight, $fn = 100);
    }
    
    translate([screwOffset , screwOffset , 0]) {
      cylinder(d=screwDia, h = topHeight, $fn=100);
    }
    translate([screwOffset , cubeTotalWidth - screwOffset , 0]) {
      cylinder(d=screwDia, h = topHeight, $fn=100);
    }
    translate([cubeTotalWidth - screwOffset , screwOffset, 0]) {
      cylinder(d=screwDia, h = topHeight, $fn=100);
    }
    translate([cubeTotalWidth - screwOffset ,cubeTotalWidth - screwOffset, 0]) {
      cylinder(d=screwDia, h = topHeight, $fn=100);
    }
  }  
}

bottom();

translate([cubeTotalWidth + cubeTotalWidth / 2,0,0]) {
  top();
}

