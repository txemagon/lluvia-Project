function loaded() {
    document.getElementById('output').innerHTML = "<span style='color: red; font-style: italic;'>.: loaded :.</span><br/>" +
        "<span style='font-style: italic;'>lluvia<b>Project</b></span>" +
        " is now loaded without any errors."
}


function required_packages() {
    PackageManager.drop("shape")
}

function main() {
    /*
    Write some test if you like to see if they work inside test function.
    File test.js is added to git but discarded inside .gitignore. This
    way your local tests won't overlap with other programmers' tests.
    */
    test()

    // If we get to this line the page will display: "loaded"
    loaded()
}