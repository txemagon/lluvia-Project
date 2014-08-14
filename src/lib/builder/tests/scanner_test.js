alert("Loading...")
assert('El scanner puede saber cuantas palabras se le han pasado.',
    'word_number.length', '3',
    's = new Scanner();  \
     word_number = s.split("jazz house classic")')


assert('El scanner puede saber cuantas palabras se le han pasado dando igual los espacios(en el test no se ve pero hay un monton de espacios).',
    'word_number.length', '3',
    's = new Scanner();  \
     word_number = s.split("      jazz   house classic      ")')