alert("Loading...")

assert("FilePath#normalize 1. ",
	'a.normalize()', '"/Home/Dan/Work"',
	'var a = new FilePath("/Home/Dan/Work");\
	a.normalize()')

assert("FilePath#normalize 2. ",
	'a.normalize()', '"./Work/me/"',
	'var a = new FilePath("./Work/me/proyect/.."); \
         a.normalize()')

assert("FilePath#normalize 3. ",
	'a.normalize("/Work/me/../proyect")', '"/Work/proyect"',
	'var a = new FilePath("Home"); \
         a.normalize("/Work/me/../proyect")')

assert("FilePath#normalize 4. ",
	'a.normalize()', '"Path undefined"',
	'var a = new FilePath(); \
         a.normalize()')

assert("FilePath#normalize 5. ",
	'a.normalize()', '"Home"',
	'var a = new FilePath("Home"); \
         a.normalize()')

assert("FilePath#normalize 6. ",
	'a.normalize()', '"/Home/Dan/Work"',
	'var a = new FilePath("/Home\\\\Dan/Work");\
	a.normalize()')

 /*No se puede hacer aqui este ejemplo:
 *var a = new FilePath("Work\\dan\\..\\joe\\js\\..")
 *     a.normalize()
 *     //=> "Work\\joe\\"
 * Dan un problema las backslashes.
 */

assert("FilePath#normalize 7. ",
	'a.normalize()', '"Work\\\\joe\\\\"',
	'var a = new FilePath("Work\\\\dan\\\\..\\\\joe\\\\js\\\\.."); \
         a.normalize()')

assert("FilePath#join 1. ",
	'a.join("/Work", "/pep", "/project/lluvia")', '"/Work/pep/project/lluvia"',
	'var a = new FilePath()')

assert("FilePath#join 2. ",
	'a.join("/Work", "pep", "project/lluvia")', '"/Work/pep/project/lluvia"',
	'var a = new FilePath()')

assert("FilePath#join 3. ",
	'a.join("/Work", "pep", "project/lluvia", "js", "..")', '"/Work/pep/project/lluvia/"',
	'var a = new FilePath()')

assert("FilePath#join 4. ",
	'a.join("/Work", "pep", "/..", "project/../lluvia", "js")', '"/Work/lluvia/js"',
	'var a = new FilePath()')

assert("FilePath#join 5. ",
	'a.join("/Work", "/pep", 5, {},"/project/lluvia")', '"/Work/pep/project/lluvia"',
	'var a = new FilePath()')
