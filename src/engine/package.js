$K_dependencies = [{
    package: "engine",
    description: "Event and execution control.",
    path: "engine/",
    files: [{
        name: "ll_Processor.js",
        description: "Manage multiple threads."
    }, {
        name: "ll_Thread.js",
        description: "Thread functionality."
    }, {
        "name": "ll_State.js",
        "description": "Each of the states of an Automaton."
    }, {
        name: "ll_Automata.js",
        description: "Finite automaton."
    }, {
        name: "ll_StateGear.js",
        description: "State change mechanism."
    }, {
        name: "ll_ThreadAutomata.js",
        description: "Diferential automata."
    }, {
        name: "ll_Device.js",
        description: "App thread with queue mechanism"
    }, {
        name: "ll_EventDispatcher.js",
        description: "Event dispatcher."
    }, {
        name: "ll_Gate.js",
        description: "HTML mapping in lluvia."
    }, {
        name: "ll_Lookup.js",
        description: ""
    }, {
        name: "ll_MessageEvent.js",
        description: "Message generator."
    }]
}]