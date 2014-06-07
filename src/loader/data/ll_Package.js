/**
 * @class Package
 * Defines a package.
 *
 * ### Example
 *
 *    $K_package = {
 *        package: "Boid",
 *        description: "lluvia loader. User application loader. Booter.",
 *        path: "/kernel",
 *        requires: ["loader-v1.0"],
 *        provides: ["utils", "kernel", "engine", "browser", "mathematics"],
 *        offers:   [],
 *        files:    ["ClassSmthing.js", "main.js"]
 *     }
 *
 * @constructor
 *
 * @param {String} package     Name of the package. Perferably in singular. Use plurals
 *                             for catchall directories.
 * @param {String} description Name briefly package aim.
 * @param {String} path        Substitutes package property as the name of the
 *                             directory. When it starts with forward slash is
 *                             an absolute route. There are two absolute routes: One for lluvia
 *                             and one for the vendor app.
 * @param {Array} provides     List of subpackages that will be included.
 * @param {Array} requires     Same as *provides* but forces the loading before tackling *files* section.
 * @param {Array} files        List of files in *path* directory. File names prevent version control issues.
 *                             So despite it is not related to, avoid bash filename expansion pattern:
 *                             ?*{-,~,[><]?(=)}v[0-9]*.
 * **Not Valid**: file~v2.0.js, file&lt;v3.js, file&gt;=v5.js
 * **Valid**: file.js, file~2.0.js, filev2.0.js, ~v2.0.js, file&gt;=vA1.js
 */
({
    package: "",
    description: "",
    path: "",
    requires: [],
    provides: [],
    offers: [],
    files: []
}).to_class("Package")