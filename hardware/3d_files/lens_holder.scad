main_dia = 56;
tube_dia = 50;
main_height = 20;

lens_dia = 35;
lens_height = 3;
lens_outline_dia = lens_dia - 2.5;
lens_outline_height = 2; 


lens_ring_dia = 40;
lens_ring_height = 4;
lens_ring_holder_width = 5;
lens_holder_depth = ((main_dia - lens_ring_dia) / 4) + 1; 

ir_sender_tube_fix_length = 50;
ir_sender_tube_fix_width = 8;
ir_sender_tube_fix_height = 5; 
ir_sender_tube_fix_slit_width  = 5;


$fn=100;

/*
* The lens holder
*/
module lens_holder() {
  difference() {
    cylinder(main_height, d = main_dia);  
    lens_ring_offset = main_height-lens_ring_height;
    
    // lens holder ring
    translate([0,0,lens_ring_offset]) {
      cylinder(lens_ring_height,d=lens_ring_dia);
    }
  
    // place for the lens
    lens_offset = lens_ring_offset - lens_height;
    translate([0,0,lens_offset]) {
      cylinder(lens_height,d=lens_dia);
    }
  
    // outline holder for the lens
    lens_outline_offset = lens_offset - lens_outline_height ;
    translate([0,0,lens_outline_offset]) {
      cylinder(lens_outline_height,d=lens_outline_dia);
    }
  
    // hollow the rest
    hollow_height = main_height - lens_outline_offset + lens_outline_height;
    cylinder(hollow_height, d = tube_dia);
  }
}

/*
* The lens holder ring
*/
module lens_holder_ring() {
  difference() {
    cylinder(lens_ring_height,d=lens_ring_dia);
    cylinder(lens_ring_height,d=lens_outline_dia);
  }
}

/**
* Fix slit for the ir sender
*/
module ir_sender_tube_fix() {
  difference() {
    cube([ir_sender_tube_fix_length,ir_sender_tube_fix_width,ir_sender_tube_fix_height]);
    slit_offset = (ir_sender_tube_fix_width - ir_sender_tube_fix_slit_width) / 2;
    translate([slit_offset ,slit_offset,0]) {
      cube([ir_sender_tube_fix_length-(slit_offset *2),ir_sender_tube_fix_slit_width,ir_sender_tube_fix_height]);
    }
    translate([0,ir_sender_tube_fix_width/2,-(tube_dia/2)+(ir_sender_tube_fix_height/1.5)]) {
      rotate([0, 90, 0])  {
        cylinder(ir_sender_tube_fix_length+5,d=tube_dia);
      }
    }
  }
}


lens_holder();
translate([main_dia,0,0]) {
  lens_holder_ring();
}

translate([0,main_dia/2 +5,0]) {
  ir_sender_tube_fix();
}