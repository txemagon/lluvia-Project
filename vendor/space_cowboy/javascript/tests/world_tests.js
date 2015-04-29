
assert("The Framework is properly linked",
       "a.inject(0, function(el, sum){ return el + sum; })", "10",
       "a = [1, 2, 3, 4 ]", "delete a")

assert("There is a object representing the World where boids move.",
       "exists", "'Yes'",
       "exists = 'Yes'; try{ new World();} catch(err){ exists = 'No';}" )
       
       

