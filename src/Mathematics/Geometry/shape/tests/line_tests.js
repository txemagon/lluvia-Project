assert("Calculate the slope of a line.",
    "m", '-0.5',
  'l1 = new StraightLine(new Vector(4,2), new Vector(2,3));  \
   m = slope_line(l1)')

assert("Calculate the slope of a horizontal line.",
    "m", '0',  
  'l1 = new StraightLine(new Vector(-1,-2), new Vector(2,-2));  \
   m = slope_line(l1)')

assert("Calculate the slope of a vertical line(tan 90º is indetermined).",
    "m", 'undefined',  
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
// Punto de corte de dos lienas que no se cortan
assert(".", 
    "p", 'undefined',  
  'l1 = new StraightLine(new Vector(1,0), new Vector(0,-1));  \
   l2 = new StraightLine(new Vector(2,0), new Vector(0,-2));  \
   p = Line.get_intersection(l1, l2)')

// Punto de corte de dos lineas iguales
assert(".", 
    "p", 'undefined',  
  'l1 = new StraightLine(new Vector(1,0), new Vector(0,-1));  \
   l2 = new StraightLine(new Vector(1,0), new Vector(0,-1));  \
   p = Line.get_intersection(l1, l2)')

// Punto de corte en el eje X
assert("Cut off point two lines in first quadrant.", 
    "p", '[2,0]',  
  'l1 = new StraightLine(new Vector(0,2), new Vector(2,0));  \
   l2 = new StraightLine(new Vector(0,-2), new Vector(2,0));  \
   p = Line.get_intersection(l1, l2)')

// Punto de corte en el eje X  dando el punto de corte
assert(".", 
    "p", '[3,0]',  
  'l1 = new StraightLine(new Vector(0,1), new Vector(3,0));  \
   l2 = new StraightLine(new Vector(0,-3), new Vector(3,0));  \
   p = Line.get_intersection(l1, l2)')

//La misma recta pero con otras coodernadas
assert(".", 
    "p", '[3,0]',  
  'l1 = new StraightLine(new Vector(6,-1), new Vector(3,0));  \
   l2 = new StraightLine(new Vector(0,-3), new Vector(-9,-12));  \
   p = Line.get_intersection(l1, l2)')


// Que se corten dos lineas en el primer cuadrante
assert("No funciona!!!!!! .", 
    "p", '[4,2]',  
  'l1 = new StraightLine(new Vector(0,4), new Vector(7,0));  \
   l2 = new StraightLine(new Vector(2,0), new Vector(-2,0));  \
   p = Line.get_intersection(l1, l2)')
// Punto de corte en el segundo cuadrante
// Punto de corte en el tercer cuadrante
// Punto de corte en el cuarto cuadrante
// Punto de corte siendo una vertical y otra horizontal
// Punto de corte en eje de coordenadas