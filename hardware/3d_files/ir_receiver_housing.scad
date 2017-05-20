// the main width 
main_width = 36;

// for the connectors
breackout_width = 17;
breackout_depth = 4; 
breackout_height = 5;


// height of the top
top_height = 2.5;

// how thick is the outer wall
wall_thickness = 3;

// how thick is the bottom
bottom_thickness = 2; 

// pcb sizes
pcb_size = 30;
pcb_outline_width = 2;
pcb_clearance = 3;
pcb_height = 1.6;

// dome_radius
dome_diameter = 25;
dome_bottom_height = 5;

// screw holes
screw_diameter = 3.2;
screw_offset = 2.6;

// height of the bottom module
bottom_height = bottom_thickness + dome_bottom_height + pcb_clearance + pcb_height;

$fn = 15;

clamp_height = 2;
clamp_pin_height = 1;
clamp_pin_width = 20;
clamp_pin_thickness = 3;
clamp_pin_offset = 4;

// the bottom where the pcb is housing 
module bottom() {  
  difference() {
    // main cube from 
    cube([main_width, main_width, bottom_height]);    
    
    screw_holes(bottom_height);
    
    // breakouts
    brackout_offset = (main_width - breackout_width) / 2;
    translate([brackout_offset,0,bottom_height-breackout_height]) {
      cube([breackout_width,wall_thickness,breackout_height]);
    }    
    translate([brackout_offset,main_width-wall_thickness,bottom_height-breackout_height]) {
      cube([breackout_width,wall_thickness,breackout_height]);
    }
    
    // hollow the cube
    hollow_width = main_width - (wall_thickness * 2);
    corner_width = (hollow_width - pcb_size);
    translate([wall_thickness+(corner_width/2),wall_thickness,bottom_thickness]) {
      hollow_width = main_width - (wall_thickness * 2);
      hollow_height = bottom_height - bottom_thickness;       
      union() {
        cube([hollow_width-corner_width,hollow_width,hollow_height]);
        translate([-(corner_width/2),(corner_width/2),0]) {
          cube([hollow_width,hollow_width-corner_width,hollow_height]);
        }
      }  
    }
  }
  
  // place where to put the pcb
  translate([wall_thickness,wall_thickness,bottom_thickness]) {    
    pcb_holder();
  }    
    
  
  
};

// the pcb holder
module pcb_holder() {
  difference() {
    pcb_holder_height = pcb_clearance + pcb_height;
    pcb_holder_width = main_width - (2*wall_thickness);            
    cube([pcb_holder_width,pcb_holder_width,pcb_holder_height]);    

    // clearance
    center_clearance =  pcb_outline_width;
    translate([center_clearance ,center_clearance ,0]) {  
      clearance_width = pcb_size - (2*pcb_outline_width);
      cube([clearance_width,clearance_width,pcb_clearance]);
    }
    
    // pcb
    translate([0 ,0,pcb_clearance]) {
      cube([pcb_size,pcb_size,pcb_height]);
    }
  }
}

module top() {
  difference() {
    
    cube([main_width,main_width,top_height]);
    
    center_dome = main_width/2;
    translate([center_dome,center_dome,0]) {
      cylinder(top_height,d = dome_diameter);
    }
    
    center_breackout = (main_width-breackout_width) / 2;
    translate([center_breackout,0,0]) {
      cube([breackout_width, breackout_depth, top_height]);
    }
    
    translate([center_breackout,main_width-breackout_depth,0]) {
      cube([breackout_width, breackout_depth, top_height]);
    }
    
    screw_holes(top_height);
  }
  
}

// screw holes
module screw_holes(hole_height) {
  
  translate([screw_offset,screw_offset,0]) {
    cylinder(hole_height,d = screw_diameter);
  }
    
  translate([main_width-screw_offset,screw_offset,0]) {
    cylinder(hole_height,d = screw_diameter);
  }
    
  translate([screw_offset,main_width-screw_offset,0]) {
    cylinder(hole_height,d = screw_diameter);
  }
    
  translate([main_width-screw_offset,main_width-screw_offset,0]) {
    cylinder(hole_height,d = screw_diameter);
  }
}

// bottom clamp
module bottom_clamp() {
  difference() {
    cube([main_width,main_width,clamp_height]);    
    screw_holes(clamp_height);
  }
  pin_x_offset = (main_width - clamp_pin_width) / 2;
  translate([pin_x_offset ,clamp_pin_offset,clamp_height]) {
    cube([clamp_pin_width,clamp_pin_thickness,clamp_pin_height]);
  }
  
  translate([pin_x_offset ,main_width-(clamp_pin_offset + clamp_pin_thickness),clamp_height]) {
    cube([clamp_pin_width,clamp_pin_thickness,clamp_pin_height]);
  }
}

// draw the bottom
bottom();

// move so the top is next to the bottom
translate([main_width+5,0,0]) {
  top();
}

// move so the bottom_clamp is next to the bottom
translate([0,main_width+5,0]) {
  bottom_clamp();
}

