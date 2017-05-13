// the main width and height 
main_width = 40;
main_height = 20;

// how thick is the outer wall
wall_thickness = 2.5;

// how thick is the bottom
bottom_thickness = 3; 

pcb_size = 30;
pcb_outline_width = 2;
pcb_clearance = 3;
pcb_height = 1.6;

// the bottom where the pcb is housing 
module bottom_pcb() {  
  difference() {
    // main cube from 
    cube([main_width, main_width, main_height]);    
    
    // hollow the cube
    translate([wall_thickness,wall_thickness,bottom_thickness]) {
      hollow_width = main_width - (wall_thickness * 2);
      hollow_height = main_height - bottom_thickness;       
      cube([hollow_width,hollow_width,hollow_height]);
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


//pcb_holder();

bottom_pcb();