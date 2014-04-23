
assert("Calculate the slope of a line.",
    "m", '-0.5',
  'l1 = new StraightLine(new Vector(4,2), new Vector(2,3));  \
   m = slope_line(l1)')

assert("Calculate the slope of a horizontal line.",
    "m", '0',  
  'l1 = new StraightLine(new Vector(-1,-2), new Vector(2,-2));  \
   m = slope_line(l1)')

assert("Calculate the slope of a vertical line(tan 90º is indetermined).",
    "m", '"-Infinity"',  
  'l1 = new StraightLine(new Vector(3,3), new Vector(3,-3));  \
   m = slope_line(l1)')   

assert("Check if two lines not intersect.",
    "inter", 'false',
  'l1 = new StraightLine(new Vector(0,1), new Vector(1,0));  \
   l2 = new StraightLine(new Vector(0,2), new Vector(2,0));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines vertical not intersect.",
    "inter", 'false',
  'l1 = new StraightLine(new Vector(-2,3), new Vector(-2,4));  \
   l2 = new StraightLine(new Vector(-4,-1), new Vector(-4,0)); \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines horizontal not intersect.",
    "inter", 'false',
  'l1 = new StraightLine(new Vector(-2,2), new Vector(-5,2));  \
   l2 = new StraightLine(new Vector(4,-2), new Vector(-4,-2)); \
   inter = Line.intersects$U(l1, l2)')

assert("The same line does not consider that crosses.",
    "inter", 'false',
  'l1 = new StraightLine(new Vector(-2,2), new Vector(-5,2));  \
   l2 = new StraightLine(new Vector(-2,2), new Vector(-5,2));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect in first quadrant.",
    "inter", 'true',
  'l1 = new StraightLine(new Vector(1,0), new Vector(3,3));  \
   l2 = new StraightLine(new Vector(0,3), new Vector(3,0));  \
   inter = Line.intersects$U(l1, l2)')
assert("Check if two lines intersect in second quadrant.",
    "inter", 'true',
  'l1 = new StraightLine(new Vector(-4,3), new Vector(-3,2));  \
   l2 = new StraightLine(new Vector(-2,3), new Vector(-3,2));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect in third quadrant.",
    "inter", 'true',  
  'l1 = new StraightLine(new Vector(-3,0), new Vector(0,-3)); \
   l2 = new StraightLine(new Vector(0,-1), new Vector(1,0));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect in fourth quadrant.",
    "inter", 'true',
  'l1 = new StraightLine(new Vector(-4,0), new Vector(-4,-4)); \
   l2 = new StraightLine(new Vector(0,4), new Vector(-2,-4));  \
   inter = Line.intersects$U(l1, l2)')

assert("Check if two lines intersect one vertical and other horizontal.",
    "inter", 'true',
  'l1 = new StraightLine(new Vector(1,1), new Vector(6,1));  \
   l2 = new StraightLine(new Vector(2,3), new Vector(2,-4)); \
   inter = Line.intersects$U(l1, l2)')

assert("Calculating the distance between two parallel lines.",
    "Math.round(d*100)/100", '0.71',  
  'l1 = new StraightLine(new Vector(0,2), new Vector(2,0));  \
   l2 = new StraightLine(new Vector(0,1), new Vector(1,0));  \
   d = Line.distance(l1, l2)')

assert("Calculating the distance between two parallel lines vertical.",
    "d", '3',  
  'l1 = new StraightLine(new Vector(1,1), new Vector(1,0));  \
   l2 = new StraightLine(new Vector(4,3), new Vector(4,0));  \
   d = Line.distance(l1, l2)')

assert("Calculating the distance between two parallel lines horizontal.",
    "d", '2',  
  'l1 = new StraightLine(new Vector(0,4), new Vector(4,4));  \
   l2 = new StraightLine(new Vector(0,2), new Vector(4,2));  \
   d = Line.distance(l1, l2)')

assert("Calculating the distance between two lines equals.",
    "d", '0',  
  'l1 = new StraightLine(new Vector(0,4), new Vector(4,4));  \
   l2 = new StraightLine(new Vector(0,4), new Vector(4,4));  \
   d = Line.distance(l1, l2)')

assert("Cutoff of two lines that do not intersect.", 
    "p", 'undefined',  
  'l1 = new StraightLine(new Vector(1,0), new Vector(0,-1));  \
   l2 = new StraightLine(new Vector(2,0), new Vector(0,-2));  \
   p = Line.get_intersection(l1, l2)')

assert("Point cut two equal lines.", 
    "p", 'undefined',  
  'l1 = new StraightLine(new Vector(1,0), new Vector(0,-1));  \
   l2 = new StraightLine(new Vector(1,0), new Vector(0,-1));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff in the x axis.", 
    "p", '[2,0]',  
  'l1 = new StraightLine(new Vector(0,2), new Vector(2,0));  \
   l2 = new StraightLine(new Vector(0,-2), new Vector(2,0));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff in the x axis.", 
    "p", '[3,0]',  
  'l1 = new StraightLine(new Vector(0,1), new Vector(3,0));  \
   l2 = new StraightLine(new Vector(0,-3), new Vector(3,0));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff of a horizontal line and a vertical.", 
    "p", '[2,1]',  
  'l1 = new StraightLine(new Vector(0,1), new Vector(1,1));  \
   l2 = new StraightLine(new Vector(2,-1), new Vector(2,-2));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff of a horizontal line and a vertical(bis).", 
    "p", '[2,1]',  
  'l1 = new StraightLine(new Vector(-5,1), new Vector(1,1));  \
   l2 = new StraightLine(new Vector(2,-2), new Vector(2,-1));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff of two lines", 
    "p", '[4,10]',  
  'l1 = new StraightLine(new Vector(1,1), new Vector(2,4));  \
   l2 = new StraightLine(new Vector(7,1), new Vector(6,4));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff of two lines.", 
    "p", '[3,0]',  
  'l1 = new StraightLine(new Vector(0,1), new Vector(6,-1));  \
   l2 = new StraightLine(new Vector(0,-3), new Vector(-9,-12));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff of two lines(Not working!!).", 
    "p", '[4,2]',  
  'l1 = new StraightLine(new Vector(0,4), new Vector(7,0));  \
   l2 = new StraightLine(new Vector(2,0), new Vector(-2,0));  \
   p = Line.get_intersection(l1, l2)')

assert("Cut off point two lines in first quadrant.", 
    "p", '[1,1]',  
  'l1 = new StraightLine(new Vector(-1,3), new Vector(3,-1));  \
   l2 = new StraightLine(new Vector(-1,-1), new Vector(2,2));  \
   p = Line.get_intersection(l1, l2)')

assert("Cut off point two lines in second quadrant.", 
    "p", '[-3,3]',  
  'l1 = new StraightLine(new Vector(-1,5), new Vector(-5,1));  \
   l2 = new StraightLine(new Vector(-1,-3), new Vector(-4,6));  \
   p = Line.get_intersection(l1, l2)')

assert("Cut off point two lines in third quadrant.", 
    "p", '[-2,-2]',  
  'l1 = new StraightLine(new Vector(-4,-3), new Vector(2,0));  \
   l2 = new StraightLine(new Vector(-3,2), new Vector(-1,-4));  \
   p = Line.get_intersection(l1, l2)')

assert("Cutoff point of two lines in the coordinate axis.", 
    "p", '[0,0]',  
  'l1 = new StraightLine(new Vector(4,0), new Vector(-4,0));  \
   l2 = new StraightLine(new Vector(0,3), new Vector(0,-8));  \
   p = Line.get_intersection(l1, l2)')
