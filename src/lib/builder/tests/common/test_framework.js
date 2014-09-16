var _test_panel_name = '_testResults'
var $LLGvn // It's necessary to hold the evaluation in a globlal variable to keep garbage collector's hands out of the code

function _test_equals(value1, value2) {
    var ERROR = 0.00001

    if (typeof(value1) == "number" && typeof(value2) == "number")
        return (value2 > (value1 - ERROR)) && (value2 < (value1 + ERROR))
    else if (value1 && value1.respond_to("eql$U"))
        return value1.eql$U(value2)

    else
        return value1 == value2
}

function sanitize(text) {
    return text.replace(/;;/g, ";")
}

function beautify(text) {
    return text.replace(/(;){2}/g, "PPPPP___###").replace(/</g, "&lt;").replace(/;/g, "\n<br/>").replace(/PPPPP___###/g, ";")
}

function replace_function_call(code, fn_name, return_value) {
    var last_name_pos = -1
    while ((last_name_pos = code.indexOf(fn_name, last_name_pos + 1)) != -1) {
        var opened_par = 0
        var start_index = 0
        do {
            start_index++
        } while (code.charAt(last_name_pos + start_index) != '(')
        opened_par++
        do {
            start_index++
            if (code.charAt(last_name_pos + start_index) == '(')
                opened_par++
                if (code.charAt(last_name_pos + start_index) == ')')
                    opened_par--
        } while (opened_par)
        code = code.replace(code.substr(last_name_pos, start_index + 1), return_value)
    }

    return code
}

function eval_value(testing, depth) {
    depth = depth || 0

    try {
        return eval.call(null, sanitize(testing))
    } catch (err) {
        if (Exception.is$U(err, "method call") || Exception.is$U(err, "singleton method")) {
            return Exception.parse(err, "method call")
        }
        if (Exception.is$U(err, "function call")) {
            if (depth >= 10)
                throw err
            return eval_value(replace_function_call(testing, Exception.is$U(err, "function call"), Exception.parse(err, testing).toSource()), depth + 1)
        }
        return Exception.parse(err) // todo: this is actually a problem because we only rescue the problematic snippet (the problem rises in the eval not in the real code, so it affects the whole expression).
    }
}


function _make_test(kind) {
    var res = ["Ok", "Failed"]
    var test_text = "Testing: "
    var test_res = "\n<br/>\n"
    var sep = ": "
    var test_panel = document.getElementById(_test_panel_name)


    ///
    if (kind == "assert")
        return function(sentence, testing, waited, before_test, post_condition) {

            eval_value(before_test)
            var _testing = testing
            var _test_value = eval_value(testing)
            if (_test_value && _test_value.toSource())
                _test_value = _test_value.value_of()
            var _waited = waited
            testing = eval_value(testing)
            waited = eval_value(waited)
            eval_value(post_condition || ";")
            var i = _test_equals(testing, waited) ? 0 : 1

            var this_sample = ""
            this_sample += "<div class='TestSample'>"
            this_sample += "<h3 class='TestSample_" + res[i] + "'>"
            this_sample += test_res + test_text + sentence + sep + res[i] + test_res
            this_sample += "</h3>"
            this_sample += "<p class='TestCode'>"
            this_sample += "Given: <br/>"
            this_sample += beautify(before_test)
            this_sample += "</p>"
            this_sample += "<p class='TestDescription'>"
            this_sample += "<b>The results were:</b> <br/>"
            this_sample += "Real Value: " + _testing + " => " + _test_value || "null"
            this_sample += "<br/>Waited Value: " + _waited + "<br/>"
            this_sample += "</p>"
            this_sample += "</div>"


            test_panel.innerHTML += this_sample
        }

    if (kind == "given")
        return function(title, given_block) {

            var this_sample = ""
            this_sample += "<div class='TestGiven'>"
            this_sample += "<h3>Given: " + title + "</h3>"
            this_sample += "<p>"
            this_sample += beautify(given_block)
            this_sample += "</p>"
            this_sample += "</div>"
            test_panel.innerHTML += this_sample
            return eval_value(given_block)
        }
}

var _clean_tests = function() {
    document.getElementById(_test_panel_name).innerHTML = ''
}


var assert

function init_testframework() {
    assert = _make_test("assert")
    given = _make_test("given")

    for (var i = 0; i < _test_index.length; i++) {
        var script = document.createElement('script')
        script.setAttribute('type', 'text/javascript')
        script.setAttribute('src', _test_index[i])
        document.getElementsByTagName('head')[0].appendChild(script)
    }
}