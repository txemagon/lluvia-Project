assert("Calculate the slope of a line",
    "m", '-0.5',  
  'l1 = new StraightLine(new Vector(4,2), new Vector(2,3));  \
   m = slope_line(l1)')


assert("Check if two lines not intersect",
    "inter", 'false',  
  'l1 = new StraightLine(new Vector(0,1), new Vector(1,0));  \
   l2 = new StraightLine(new Vector(0,2), new Vector(2,0));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect in first quadrant",
    "inter", 'true',  
  'l1 = new StraightLine(new Vector(1,0), new Vector(3,3));  \
   l2 = new StraightLine(new Vector(0,3), new Vector(3,0));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect in second quadrant",
    "inter", 'true',  
  'l1 = new StraightLine(new Vector(-4,3), new Vector(-3,2));  \
   l2 = new StraightLine(new Vector(-2,3), new Vector(-3,2));  \
   inter = Line.intersects$U(l1, l2)')


assert("Check if two lines intersect in third quadrant SIN HACER",
    "inter", 'true',  
  'l1 = new StraightLine(new Vector(1,0), new Vector(3,3));  \
   l2 = new StraightLine(new Vector(0,3), new Vector(3,0));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect in fourth quadrant SIN HACER",
    "inter", 'true',  
  'l1 = new StraightLine(new Vector(1,0), new Vector(3,3));  \
   l2 = new StraightLine(new Vector(0,3), new Vector(3,0));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect one vertical and other horizontal",
    "inter", 'true',  
  'l1 = new StraightLine(new Vector(1,1), new Vector(6,1));  \
   l2 = new StraightLine(new Vector(2,3), new Vector(2,-4));  \
   inter = Line.intersects$U(l1, l2)')

assert("Cut point of a horizontal line and a vertical",
    "inter", '[1,1]',  
  'l1 = new StraightLine(new Vector(-1,-1), new Vector(1,1));  \
   l2 = new StraightLine(new Vector(0,2), new Vector(2,0));  \
   inter = Line.get_intersection(l1, l2)')


