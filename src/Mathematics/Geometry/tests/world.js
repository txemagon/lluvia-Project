world = World.initialize("worldCanvas")

i = new Versor(2,0,0)
i.label = "i"
i.draw()
j = new Versor(0,2,0)
j.label = "j"
j.draw()
k = new Versor(0,0,2)
k.label = "k"
k.draw()

v = new ProjectedVector(1,3,2)
v.label = "v"
v.draw()
