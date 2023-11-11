(function () { var $jscomp = $jscomp || {}; $jscomp.scope = {}, $jscomp.arrayIteratorImpl = function (t) { var n = 0; return function () { return n < t.length ? { done: !1, value: t[n++] } : { done: !0 } } }, $jscomp.arrayIterator = function (t) { return { next: $jscomp.arrayIteratorImpl(t) } }, $jscomp.makeIterator = function (t) { var n = "undefined" != typeof Symbol && Symbol.iterator && t[Symbol.iterator]; return n ? n.call(t) : $jscomp.arrayIterator(t) }, $jscomp.arrayFromIterator = function (t) { for (var n, o = []; !(n = t.next()).done;)o.push(n.value); return o }, $jscomp.arrayFromIterable = function (t) { return t instanceof Array ? t : $jscomp.arrayFromIterator($jscomp.makeIterator(t)) }, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, n, o) { t != Array.prototype && t != Object.prototype && (t[n] = o.value) }, $jscomp.getGlobal = function (t) { return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function () { $jscomp.initSymbol = function () { }, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol) }, $jscomp.Symbol = function () { var t = 0; return function (n) { return $jscomp.SYMBOL_PREFIX + (n || "") + t++ } }(), $jscomp.initSymbolIterator = function () { $jscomp.initSymbol(); var t = $jscomp.global.Symbol.iterator; t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype, t, { configurable: !0, writable: !0, value: function () { return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this)) } }), $jscomp.initSymbolIterator = function () { } }, $jscomp.initSymbolAsyncIterator = function () { $jscomp.initSymbol(); var t = $jscomp.global.Symbol.asyncIterator; t || (t = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator")), $jscomp.initSymbolAsyncIterator = function () { } }, $jscomp.iteratorPrototype = function (t) { return $jscomp.initSymbolIterator(), (t = { next: t })[$jscomp.global.Symbol.iterator] = function () { return this }, t }, $jscomp.iteratorFromArray = function (t, n) { $jscomp.initSymbolIterator(), t instanceof String && (t += ""); var o = 0, r = { next: function () { if (o < t.length) { var e = o++; return { value: n(e, t[e]), done: !1 } } return r.next = function () { return { done: !0, value: void 0 } }, r.next() } }; return r[Symbol.iterator] = function () { return r }, r }, $jscomp.polyfill = function (t, n, o, r) { if (n) { for (r = 0, o = $jscomp.global, t = t.split("."); r < t.length - 1; r++) { var e = t[r]; e in o || (o[e] = {}), o = o[e] } (n = n(r = o[t = t[t.length - 1]])) != r && null != n && $jscomp.defineProperty(o, t, { configurable: !0, writable: !0, value: n }) } }, $jscomp.polyfill("Array.prototype.keys", function (t) { return t || function () { return $jscomp.iteratorFromArray(this, function (t) { return t }) } }, "es6", "es3"), $jscomp.checkStringArgs = function (t, n, o) { if (null == t) throw TypeError("The %27this%27 value for String.prototype." + o + " must not be null or undefined"); if (n instanceof RegExp) throw TypeError("First argument to String.prototype." + o + " must not be a regular expression"); return t + "" }, $jscomp.polyfill("String.prototype.startsWith", function (t) { return t || function (t, n) { var o = $jscomp.checkStringArgs(this, t, "startsWith"); t += ""; var r = o.length, e = t.length; n = Math.max(0, Math.min(0 | n, o.length)); for (var i = 0; i < e && n < r;)if (o[n++] != t[i++]) return !1; return i >= e } }, "es6", "es3"), $jscomp.findInternal = function (t, n, o) { t instanceof String && (t = String(t)); for (var r = t.length, e = 0; e < r; e++) { var i = t[e]; if (n.call(o, i, e, t)) return { i: e, v: i } } return { i: -1, v: void 0 } }, $jscomp.polyfill("Array.prototype.find", function (t) { return t || function (t, n) { return $jscomp.findInternal(this, t, n).v } }, "es6", "es3"), function () { Math.round(999999999 * Math.random()).toString(); var t = 1, n = 1, o = null, r = null, e = [], i = function (t) { for (var n = [], o = 0; o < arguments.length; ++o)n[o - 0] = arguments[o]; console.group("OvO TAS Tools Log:"), console.log.apply(console, $jscomp.arrayFromIterable(n)), console.groupEnd() }, l = globalThis.ovoTasTools = { init: function () { window.cr_getC2Runtime && (r = l.runtime = cr_getC2Runtime()), r ? (l.startUpdate(), i("OvO TAS Tools Initialised!")) : alert("this is code only works on OvO!") }, get version() { return 4 }, get timescale() { return t }, set timescale(a) { a !== t && (n = t, t = a) }, isInLevel: function () { return r.running_layout.name.startsWith("Level") }, isPaused: function () { if (l.isInLevel()) return r.running_layout.layers.find(function (t) { return "Pause" === t.name }).visible }, loadInputs: function (t) { e = "number" == typeof t[0][0] ? t : t.map(function (t, n) { return [1 * n / 60, t] }) }, get loadedInputs() { return e }, playInputs: function () { l.timescale = 1; var t = 0, n = { tick: function () { var o = r.dt; for (t += o, console.log(t, o, e.length); 0 < e.length && t > e[0][0];)t -= 1 / 60, e.shift()[1].forEach(function (t) { "Restart" === t ? c2_callFunction("Menu > Replay") : "Jump" === t ? c2_callFunction("Controls > Buffer", ["Jump"]) : c2_callFunction("Controls > " + t) }); 0 === e.length && r.untickMe(n) } }; r.tickMe(n) }, isInEndCard: function () { if (l.isInLevel()) { var t = r.running_layout.layers.find(function (t) { return "End Game" === t.name }), n = r.running_layout.layers.find(function (t) { return "End Card" === t.name }); return t.visible || n.visible } }, pause: function () { l.timescale = 0 }, undoTimescale: function () { l.timescale = n }, step: function () { var t = r.timescale; r.timescale = 1, r.tick(!0, null, null), r.timescale = t }, startUpdate: function () { o = setInterval(l.update, 10) }, stopUpdate: function () { clearInterval(o), o = null }, update: function () { var t = l.timescale; t == r.timescale || !l.isInLevel() || l.isPaused() || l.isInEndCard() || (i("Updating timescale"), r.timescale = t) } }; l.init() }() })();
(function () { // My GUI
    let old = globalThis.sdk_runtime
    c2_callFunction('execCode', ['globalThis.sdk_runtime = this.runtime'])
    let runtime = globalThis.sdk_runtime
    globalThis.sdk_runtime = old
    let notify = (text, title = 'TAS', image = './speedrunner.png') => {
        cr.plugins_.sirg_notifications.prototype.acts.AddSimpleNotification.call(
            runtime.types_by_index.find(
                type => type.plugin instanceof cr.plugins_.sirg_notifications
            ).instances[0],
            title,
            text,
            image
        )
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    localStorage.setItem("BotEnabled", "false")
    localStorage.setItem("TASGUI.TASspeed", "1")
    String.prototype.width = function (font) {
        var f = font || '12px arial',
            o = $('<div></div>')
                .text(this)
                .css({ 'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f })
                .appendTo($('body')),
            w = o.width();
        o.remove();
        return w;
    }

    let isInLevel = () => {
        return runtime.running_layout.name.startsWith('Level')
    }

    let isPaused = () => {
        if (isInLevel()) {
            if (!runtime.running_layout.layers.find(function (a) { return 'Pause' === a.name })) { return false }
            return runtime.running_layout.layers.find(function (a) {
                return 'Pause' === a.name
            }).visible
        }
    }
    let getPlayer = () =>
        runtime.types_by_index
            .filter(
                (x) =>
                    !!x.animations &&
                    x.animations[0].frames[0].texture_file.includes("collider")
            )[0]
            .instances.filter(
                (x) => x.instance_vars[17] === "" && x.behavior_insts[0].enabled
            )[0];
    let getFlag = () =>
        runtime.types_by_index.find(
            (x) =>
                x.name === "EndFlag" ||
                (x.plugin instanceof cr.plugins_.Sprite &&
                    x.all_frames &&
                    x.all_frames[0].texture_file.includes("endflag"))
        ).instances[0];

    let curState = null;
    let curLayout = null;
    let saveState = () => {
        notify("Saved player state", "State Saved");
        return runtime.saveInstanceToJSON(getPlayer(), true);
    };
    let loadState = (state) => {
        runtime.loadInstanceFromJSON(getPlayer(), state, true);
    };
    document.addEventListener("keydown", (event) => {
        if (!getFlag()) {
            return;
        }
        if (event.code === "KeyS") {
            if (event.shiftKey) {
                curState = saveState();
                savedStates.push([time, strokes])
            } else if (curState != null) {
                loadState(curState);
            }
        }
        if (event.code === "KeyR") {
            if (event.ctrlKey) {
                curState = null;
                savedStates = []
            } else if (event.shiftKey) {
                savedStates = []
                curState = null;
                runtime.changeLayout = runtime.runningLayout;
            }
        }
    });

    Object.values(runtime.layouts).forEach((layout) => {
        let oldFn = layout.startRunning.bind(layout);
        layout.startRunning = () => {
            oldFn();
            if (!getFlag()) {
                curLayout = layout.name;
                curState = null;
            } else {
                if (!(curState == null) && curLayout === layout.name) loadState(curState);
                else curState = null;
                curLayout = layout.name;
            }
        };
    });
    let styleMenuButton = (button, left, top) => {
        c = {
            backgroundColor: '#00d26a',
            border: '2px solid black',
            position: 'absolute',
            fontFamily: 'Retron2000',
            color: 'black',
            fontSize: '10pt',
            cursor: 'pointer',
            left: left,
            top: top
        }
        Object.keys(c).forEach(function (a) {
            button.style[a] = c[a]
        })

        button.innerHTML = '✅'
    }

    let styleMenuInput = (input, left, top, width) => {
        c = {
            backgroundColor: 'white',
            border: '2px solid black',
            position: 'absolute',
            fontFamily: 'Retron2000',
            color: 'black',
            cursor: 'pointer',
            fontSize: '10pt',
            cursor: 'text',
            width: width,
            top: top + 'px',
            left: left
        }
        Object.keys(c).forEach(function (a) {
            input.style[a] = c[a]
        })
    }

    let styleMenuText = (textDiv, left, top, text) => {
        c = {
            backgroundColor: 'white',
            border: 'none',
            fontFamily: 'Retron2000',
            position: 'absolute',
            top: top,
            left: left,
            color: 'black',
            fontSize: '12pt',
            cursor: 'default'
        }
        Object.keys(c).forEach(function (a) {
            textDiv.style[a] = c[a]
        })

        newContent = document.createTextNode(text)
        textDiv.appendChild(newContent)
    }



    let createGui = () => {
        b = document.createElement('div')
        c = {
            backgroundColor: 'white',
            border: '2px solid black',
            fontFamily: 'Retron2000',
            position: 'absolute',
            top: '17.5%',
            left: '32.5%',
            padding: '5px',
            color: 'black',
            fontSize: '10pt',
            display: 'block',
            width: '35%',
            height: '65%',
            display: 'flex',
        }
        Object.keys(c).forEach(function (a) {
            b.style[a] = c[a]
        })
        b.id = 'gui-editing-menu'

        xButton = document.createElement("button");
        c = {
            backgroundColor: "white",
            position: "absolute",
            fontFamily: "Retron2000",
            color: "black",
            fontSize: "10pt",
            cursor: "pointer",
            right: "1px",
            top: "1px",
        };
        Object.keys(c).forEach(function (a) {
            xButton.style[a] = c[a];
        });
        xButton.innerHTML = "❌";
        xButton.onclick = (e) => {
            b.remove();
            elementEditing = null;
        }
        EnableBotButton = document.createElement("button");
        styleMenuButton(EnableBotButton, "calc(50% + 30px)", "0%");
        if (localStorage.getItem("BotEnabled") == "false") { EnableBotButton.innerHTML = "❌"; EnableBotButton.style.backgroundColor = "#AA0000" }
        EnableBotButton.onclick = () => {
            EnableBotButton.innerHTML == "❌" ? EnableBotButton.innerHTML = "✅" : EnableBotButton.innerHTML = "❌"
            EnableBotButton.innerHTML == "❌" ? EnableBotButton.style.backgroundColor = "#AA0000" : EnableBotButton.style.backgroundColor = "#00d26a"
            botEnabled = !(EnableBotButton.innerHTML == "❌")
            localStorage.setItem("BotEnabled", botEnabled)
        }

        speedHackButton = document.createElement("button")
        styleMenuText(speedHackButton, "calc(50% - 81px)", "50px", "Set Speedhack")
        speedHackButton.style.border = "2px solid black"
        speedHackButton.style.padding = "4px"
        speedHackButton.onclick = () => { botEnabled && (x = parseFloat(prompt("Speedhack Multiplier (Smaller=Slower)")), ovoTasTools.timescale = x, localStorage.setItem("TASGUI.TASspeed", x.toString()), speedHacktext.innerHTML = x.toString(), speedHacktext.style.left = `calc(50% - ${(7 * localStorage.getItem('TASGUI.TASspeed').width("Retron2000")) / 8}px)`) }
        speedHacktext = document.createElement("p")
        styleMenuText(speedHacktext, `calc(50% - ${(7 * localStorage.getItem('TASGUI.TASspeed').width("Retron2000")) / 8}px)`, "25px", localStorage.getItem('TASGUI.TASspeed'));
        ToggleBotText = document.createElement("p")
        styleMenuText(ToggleBotText, "calc(50% - 71px)", "0px", "Toggle Bot");
        loadInputsButton = document.createElement("button")
        styleMenuText(loadInputsButton, "calc(50% - 60px)", "92%", "Load Replay")
        loadInputsButton.style.border = "2px solid black"
        loadInputsButton.style.padding = "4px"
        loadInputsButton.onclick = () => { notify("Playing Most Recent TAS. Currently, TASses Can Only Be Replayed At Full Speed"); localStorage.setItem("TASGUI.TASspeed", "1"); ovoTasTools.timescale = 1; b.remove(); ovoTasTools.playInputs(); ovoTasTools.loadInputs(strokes) }
        helpButton = document.createElement("button")
        styleMenuText(helpButton, "calc(50% - 24px)", "82%", "Help")
        helpButton.style.border = "2px solid black"
        helpButton.style.padding = "4px"
        helpButton.onclick = () => { b.remove(); helpGui() }

        b.appendChild(loadInputsButton);
        b.appendChild(EnableBotButton);
        b.appendChild(speedHackButton);
        b.appendChild(speedHacktext);
        b.appendChild(ToggleBotText);
        b.appendChild(helpButton);
        b.appendChild(xButton);
        document.body.appendChild(b);
    }
    let helpGui = () => {
        b = document.createElement('div')
        c = {
            backgroundColor: 'white',
            border: '2px solid black',
            fontFamily: 'Retron2000',
            position: 'absolute',
            top: '17.5%',
            left: '32.5%',
            padding: '5px',
            color: 'black',
            fontSize: '10pt',
            display: 'block',
            width: '35%',
            height: '65%',
            display: 'flex',
        }
        Object.keys(c).forEach(function (a) {
            b.style[a] = c[a]
        })
        b.id = 'help-gui'

        xButton = document.createElement("button");
        c = {
            backgroundColor: "white",
            position: "absolute",
            fontFamily: "Retron2000",
            color: "black",
            fontSize: "10pt",
            cursor: "pointer",
            right: "1px",
            top: "1px",
        };
        Object.keys(c).forEach(function (a) {
            xButton.style[a] = c[a];
        });
        xButton.innerHTML = "❌";
        xButton.onclick = (e) => {
            b.remove();
            elementEditing = null;
        }
        helpText = document.createElement("div")
        helpText.setAttribute("style", 'overflow:auto;')
        helpText.innerHTML = `<>OvOTASGui By TullyYT

-- Section 1: How To Record A TAS --

Recording A TAS Is Made Very Simple In This GUI; To Record A TAS, Simply Press 'Q' While In A Level\\.

-- Section 2: How To Slow Down The Game --

To Slow Down The Game, Click On The Hamburger Icon On The Side (This GUI's Menu), And Make Sure You Have 'Toggle Bot' Turned On. Then, Click 'Set Speedhack' And Enter The Value You Want To Slow The Game Down By\\.

-- Issues --

Because OvO is non-deterministic (it doesnt produce the same output given the same inputs), different TASses can produce different completion times.
OvOTASGui does NOT work on mobile (including the use of 'Mobile Mode').
Checkpoints/SaveStates Dont Fully Work\\.

-- Copyright --

OvOTASGui uses the Creative Commons Zero v1\\.0 Universal license, for the full contents of this license, visit <a target='none' href='https://raw\\.githubusercontent\\.com/tullyc9/OvOTASGUI/main/LICENSE'>this</a> website.

`.split(/(?<!\\)\./).join('.\n').replaceAll("\n", "<br>").replaceAll('\\', '')

        b.appendChild(helpText);
        b.appendChild(xButton);
        document.body.appendChild(b);
        c2_callFunction("Menu > Quit")
    }


    function None() { }
    recording = false
    var time
    var botEnabled = true
    var strokes = []
    var savedStates = []
    past = [false, false, false, false, false, false, false]
    var pressedKeys = {}
    var pressedKeysCode = {}
    control = false
    window.onkeyup = function (e) {
        pressedKeys[e.code] = false
        pressedKeysCode[e.keyCode] = false
        e.ctrlKey && (control = !1)
    }
    window.onkeydown = function (e) {
        pressedKeys[e.code] = true
        pressedKeysCode[e.keyCode] = true
        e.ctrlKey && (control = !!1)
    }
    upkey = runtime.types_by_index.find(x => x.plugin instanceof cr.plugins_.Globals && x.instvar_sids.length === 6).instances[0].instance_vars[1]
    downkey = runtime.types_by_index.find(x => x.plugin instanceof cr.plugins_.Globals && x.instvar_sids.length === 6).instances[0].instance_vars[3]
    leftkey = runtime.types_by_index.find(x => x.plugin instanceof cr.plugins_.Globals && x.instvar_sids.length === 6).instances[0].instance_vars[0]
    rightkey = runtime.types_by_index.find(x => x.plugin instanceof cr.plugins_.Globals && x.instvar_sids.length === 6).instances[0].instance_vars[2]


    setInterval(function () {
        isNaN(ovoTasTools.timescale) && (localStorage.setItem("TASGUI.TASspeed", "1"), speedHacktext.innerHTML = '1', speedHacktext.style.left = 'calc(50% - 7px)');
        (botEnabled) ? ovoTasTools.timescale = localStorage.getItem('TASGUI.TASspeed') : ovoTasTools.timescale = 1
        if (pressedKeys["KeyQ"] && !past[5] && botEnabled) {
            if (recording) {
                ovoTasTools.loadInputs(strokes)
                notify("Recording Ended")
            } else {
                c2_callFunction('Menu > Replay')
                time = new Date()
                notify("Recording Started")
                strokes = [[0, ["Restart"]]]
            }
            recording = !recording
        }
        if (isPaused()) {
            time = new Date(time + 5 / 300)
        }
        if (recording && botEnabled) {
            t = new Date() - time
            current = []
            if (pressedKeys["KeyR"] && !past[4]) {
                if (control) {
                    c2_callFunction('Menu > Replay')
                    time = new Date()
                    notify("Recording Restarted")
                    strokes = [[0, ["Restart"]]]
                    savedStates = []
                } else {
                    void null == curState ? current.push('Restart') : strokes = savedStates[-1][1]
                }
            }
            pressedKeysCode[leftkey] && !past[0] ? current.push('Left In') : None()
            !pressedKeysCode[leftkey] && past[0] ? current.push('Left Out') : None()
            pressedKeysCode[rightkey] && !past[1] ? current.push('Right In') : None()
            !pressedKeysCode[rightkey] && past[1] ? current.push('Right Out') : None()
            pressedKeysCode[upkey] && !past[2] ? current.push('Jump') : None()
            pressedKeysCode[downkey] && !past[3] ? current.push('Down') : None()

            if (current.length > 0) {
                strokes.push([(t * ovoTasTools.timescale) / 1000, current])
            }
        }
        past = [
            pressedKeysCode[leftkey],
            pressedKeysCode[rightkey],
            pressedKeysCode[upkey],
            pressedKeysCode[downkey],
            pressedKeys["KeyR"],
            pressedKeys["KeyQ"],
            isPaused()
        ]
    }, 1)
    notify('TAS Mod by TullyYT (& Others) Loaded; To Start Recording, Press Q. Please Note That This is An Early Version Of The TAS GUI.')
    opengui = document.createElement("Button")
    styleMenuText(opengui, "calc(100% - 23px)", "0%", "☰")
    opengui.setAttribute("id", "openGui");
    opengui.style.border = "1px solid black"
    opengui.onclick = () => {
        (!document.getElementById('gui-editing-menu')) ? createGui() : (document.getElementById('gui-editing-menu').remove(), $(".c2canvas").css("pointer-events", "unset"))
    }
    opengui.style.cursor = "pointer"
    $(opengui).css("transform", "scale(2)")
    document.body.appendChild(opengui);
})()