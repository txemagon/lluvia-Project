lluvia Project
==============

    *************************************************************************
    lluvia Project:: A Javascript community framework
    Copyright (C) <2009>  <txemagon, imasen>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Further information at <txema.gonz@gmail.com>

    *************************************************************************


Scope
-----

**lluvia Project** is a javascript framework that intends to provide an object oriented ruby-like basis. It should help for building cool effects for web applications. It 
comes along with a minimum multithreading support and messaging system. It also has 
a Mathematics library useful for games.


Files & Directories
-------------------

| File       | Description                                                         |
|------------|---------------------------------------------------------------------|
| README.md  | This file.                                                          |
| BUILDING   | Instrucitions for getting the software running.                     |
| GLOSSARY   | Specific words and jargon.                                          |
| COPYRIGHT  | Legal advice included in source files as a property                 |
| LICENSE    | gpl-3.0 Full license text.                                          |
| doc        |  Project documentation, including emails, conversations or diagrams.|
| src        |  lluvia source code.                                                | 
| util       | private tools for lluvia development.                               |
| data       | Data for testing.                                                   |
| test       | TDD framework to use into every package.                            |
| vendor     | lluvia third party applications provided as an example.             |


Development
-----------

After pulling the code, if you want to make an application, you should place your code under vendor directory. There are some requirements to be met. 
Inside the html file include _lluvia.js_ and call **bringLLuvia()**. The debug level can be provided as an integer parameter to gather more runtime information. 

Also include one file, typically _javascript/dependencies.js_, with the name of the files that make up your application. Take the following snippet as an example:

```javascript

$K_app_dependencies = [
    {   module: "Boids", 
        description: "Boids Demo App.", 
        path: "", 
        files: [ 
            { name: "brain/behavior_modifier.js",  description: "Self protection behaviors." },
            { name: "brain/behavior.js",           description: "Abstract Behavior." },
            { name: "brain/security_behavior.js",  description: "Self protection behaviors." },
            { name: "brain/itinerant_behavior.js", description: "Definition of itinerant behaviors." },
            { name: "brain/behavior_group.js",     description: "Group of related behaviors." },
            { name: "brain/brain.js",              description: "Boid Brain." },
            { name: "boid.js",                     description: "One Boid." },
            { name: "world_interface.js",          description: "World Interface." },
            { name: "boid_editor.js",              description: "Boid panel editor." },
            { name: "world.js",                    description: "The world where all boids live." },
            { name: "main.js",                     description: "main function." },
        ]
    }
]

``` 

Whenever a function **main()** is found will be automatically called after _lluvia_ loading.

If you are planning to develop within _lluvia_ make sure to create the tests first. Every folder has a test directory. Have a look there at the very begining.

For creating a new library, _util/make-module_ can help you with the scaffolding.

To see what's remaining _util/what_to_do_ .