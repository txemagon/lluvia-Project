function loaded() {
    document.getElementById('output').innerHTML = "<span style='color: red; font-style: italic;'>.: loaded :.</span><br/>" +
        "<span style='font-style: italic;'>lluvia<b>Project</b></span>" +
        " is now loaded without any errors."
}

function main() {
    // Write some test if you like to see if they work.
    var a = new Enumeration("paused", "running", ["era1", "era2", ["level1"], "era3"])

    // If we get to this line the page will display: "loaded"
    loaded()
}