alert("Loading...")

assert("Ejemplo de test exitoso.",
    'suma', '15',
    'var a = 5;   \
     var b = 10;  \
     var suma = a + b')

assert("Ejemplo de test fallido.",
    'suma', '30',
    'var a = 5;   \
     var b = 10;  \
     var suma = a + b')