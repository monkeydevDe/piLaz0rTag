// the main width 
main_width = 40;

// for the connectors
breackout_width = 15;
breackout_depth = 5; 


// height of the top
top_height = 5;

// how thick is the outer wall
wall_thickness = 3;

// how thick is the bottom
bottom_thickness = 3; 

// pcb sizes
pcb_size = 30;
pcb_outline_width = 2;
pcb_clearance = 3;
pcb_height = 1.6;

// dome_radius
dome_diameter = 25;
dome_bottom_height = 4;

// screw holes
screw_diameter = 3;
screw_offset = 2;

// height of the bottom module
bottom_height = bottom_thickness + dome_bottom_height + pcb_clearance + pcb_height;

$fn = 15;

// the bottom where the pcb is housing 
module bottom() {  
  difference() {
    // main cube from 
    cube([main_width, main_width, bottom_height]);    
    
    screw_holes(bottom_height);
    
    // hollow the cube
    hollow_width = main_width - (wall_thickness * 2);
    corner_width = (hollow_width - pcb_size);
    echo(hollow_width);
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
    center_clearance =  pcb_outline_width * 2;
    translate([center_clearance ,center_clearance ,0]) {  
      clearance_width = pcb_size - (2*pcb_outline_width);
      cube([clearance_width,clearance_width,pcb_clearance]);
    }
    
    // pcb
    translate([pcb_outline_width ,pcb_outline_width ,pcb_clearance]) {
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

// draw the bottom
bottom();

// move so the top is next to the bottom
translate([main_width*2,0,0]) {
  top();
}