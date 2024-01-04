(function () {
    let old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    let runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;
    var grav;
    var js;
    var wts;
    var ts;
    var mts;
    var pangle;
    var ms;
    var mf;
    var acc;
    var dec;
    var width;
    var height;
    var downx;
    var downy;
    var scale;
    var dead;
    var dborder = null;
    var bordercheck = null;
    let notify = (title, text, image = "https://ovoplant.github.io/ovo/versions/reverse/electric.png") => {
        cr.plugins_.sirg_notifications.prototype.acts.AddSimpleNotification.call(
            runtime.types_by_index.find(
                (type) => type.plugin instanceof cr.plugins_.sirg_notifications
            ).instances[0],
            title,
            text,
            image
        );
    };
    let behaviors = {
        init() {
            runtime.tickMe(showProperties);
            document.addEventListener("keydown", (event) => {
                if (event.code === "KeyY") {
                    if (event.shiftKey) {
                        this.loadPrompt();
                    }
                }
            });
            this.initDomUI();
            this.interval = null;
            globalThis.ovoBehaviors = this;
            notify("Mod loaded", "Press Shift + Y for options.");
            this.runtime = cr_getC2Runtime();
        },

        initDomUI() {
            let style = document.createElement("style");
            style.innerHTML = `
            .ovo-behaviors-button {
                background-color: white;
                border: solid;
                border-color: black;
                border-width: 6px;
                font-family: "Retron2000";
                position: absolute;
                z-index: 999999;
                cursor: pointer;
            }

            .ovo-behaviors-button:hover {
                background-color: rgba(200, 200, 200, 1);
            }
            `
            document.head.appendChild(style);

            let toggleButton = document.createElement("button");
            toggleButton.id = "ovo-behaviors-toggle-button";
            toggleButton.innerText = "";

            let loadIcon = document.createElement("img");
            loadIcon.src = "https://ovoplant.github.io/ovo/versions/reverse/electric.png"
            loadIcon.style.width = "38px";
            loadIcon.style.height = "38px";

            toggleButton.appendChild(loadIcon);
            toggleButton.classList.add("ovo-behaviors-button");
            toggleButton.style.top = "calc(50% - 50px)";
            toggleButton.style.right = "0%";
            toggleButton.style.transform = "translateY(-50%)";
            toggleButton.style.width = "50px";
            toggleButton.style.height = "50px";
            toggleButton.onclick = this.loadPrompt.bind(this);
            document.body.appendChild(toggleButton);
        },


        loadPrompt() {
            let bh = prompt('Choose one: "teleport", "gravity", "jumpstrength", "timescale", "angle", "speed", "fallspeed", "acceleration", "deceleration", "size", "downx", "downy", "zoom", "dead", or type "reset"');
            if (bh === "reset") {
                this.loadReset();
            } else if (bh === "teleport") {
                this.tp();
            } else if (bh === "gravity") {
                this.gravity();
            } else if (bh === "jumpstrength") {
                this.jumpstrength();
            } else if (bh === "timescale") {
                this.timescale();
            } else if (bh === "angle") {
                this.angle();
            } else if (bh === "speed") {
                this.maxspeed();
            } else if (bh === "fallspeed") {
                this.fallspeed();
            } else if (bh === "acceleration") {
                this.acceleration();
            } else if (bh === "deceleration") {
                this.deceleration();
            } else if (bh === "size") {
                this.size();
            } else if (bh === "downx") {
                this.downx();
            } else if (bh === "downy") {
                this.downy();
            } else if (bh === "zoom") {
                this.zoom();
            } else if (bh === "dead") {
                this.dead();
            } else { alert("Please choose from the list") }
        },

        loadReset() {
            let bhreset = prompt('Choose what to reset: "gravity", "jumpstrength", "timescale", "angle", "speed", "fallspeed", "acceleration", "deceleration", "size", "downx", "downy", "zoom"');
            if (bhreset === "gravity") {
                grav = 1500;
            } else if (bhreset === "jumpstrength") {
                js = 650;
            } else if (bhreset === "timescale") {
                tsreset = prompt('"player", "moveareas", or "both"?')
                if (tsreset === "player") {
                    ts = -1
                } else if (tsreset === "moveareas") {
                    mts = -1;
                } else if (tsreset === "both") {
                    ts = -1, mts = -1;
                } else { alert("Please choose from the list") }
            } else if (bhreset === "angle") {
                pangle = 0;
            } else if (bhreset === "speed") {
                clearInterval(speed);
            } else if (bhreset === "fallspeed") {
                mf = 3000;
            } else if (bhreset === "acceleration") {
                acc = 1500;
            } else if (bhreset === "deceleration") {
                clearInterval(dec);
            } else if (bhreset === "size") {
                sreset = prompt('"width", "height", or "both"?')
                if (sreset === "width") {
                    width = 32;
                } else if (sreset === "height") {
                    height = 64;
                } else if (sreset === "both") {
                    width = 32, height = 64; runtime.untickMe(lsize);
                } else { alert("Please choose from the list") }
            } else if (bhreset === "downx") {
                downx = 0;
            } else if (bhreset === "downy") {
                downy = 1;
            } else if (bhreset === "zoom") {
                scale = 1, this.Layer0().scale = 1;
            } else { alert("Please choose from the list") }
        },

        tp() {
            px = prompt('Change your x coordinate to whatever you want, leave blank to not change');
            py = prompt('Change your y coordinate to whatever you want, leave blank to not change');
            if (px === null || px === "" || isNaN(px)) {
                px = ovoBehaviors.getPlayer().x
            } else {
                ovoBehaviors.getPlayer().x = parseFloat(px)
            }
            if (py === null || py === "" || isNaN(py)) {
                py = ovoBehaviors.getPlayer().y
            } else {
                ovoBehaviors.getPlayer().y = parseFloat(py)
            }
            return;
        },

        gravity() {
            grav = prompt('Change your gravity to whatever you want');
            if (grav === null || grav === "" || isNaN(grav)) {
                alert("Must be a number, gravity reset")
                grav = 1500;
                this.getPlayer().behavior_insts[0].maxFall = parseFloat(grav) * 2
                return;
            }
            this.getPlayer().behavior_insts[0].maxFall = parseFloat(grav) * 2
            setInterval(function () { ovoBehaviors.getPlayer().behavior_insts[0].g = parseFloat(grav) }, 0);
            return;
        },

        jumpstrength() {
            js = prompt('Change your jump strength to whatever you want');
            if (js === null || js === "" || isNaN(js)) {
                alert("Must be a number, jump strength reset")
                js = 650
                return;
            }
            setInterval(function () { ovoBehaviors.getPlayer().behavior_insts[0].jumpStrength = parseFloat(js); }, 0);
            return;
        },

        timescale() {
            wts = prompt('"player" or "moveareas"?')
            if (wts === "player") {
                ts = prompt('Change your timescale to whatever you want');
                if (ts === null || ts === "" || isNaN(ts)) {
                    alert("Must be a number, timescale reset")
                    ts = -1
                    return;
                }
                setInterval(function () {
                    if (ovoBehaviors.runtime.timescale === 0 && (ovoBehaviors.getPlayer().my_timescale < 1 || ovoBehaviors.getPlayer().my_timescale > 1)) {
                        ovoBehaviors.getPlayer().my_timescale = -1
                    } else (
                        ovoBehaviors.getPlayer().my_timescale = ts), 0
                });
                if (ts < 0 && (this.getPlayer().behavior_insts[0].jumpStrength > 0 || this.getPlayer().behavior_insts[0].acc > 0 || this.getPlayer().behavior_insts[0].dec > 0)) {
                    alert("To make this function properly, please change the following into negatives: jumpstrength, acceleration, deceleration")
                    return;
                }
            }
            if (wts === "moveareas") {
                mts = prompt('Change movearea timescale to whatever you want');
                if (mts === null || mts === "" || isNaN(mts)) {
                    alert("Must be a number, timescale reset")
                    mts = -1
                    return;
                }
                obj = this.getMovearea();
                sol = obj.getCurrentSol();
                instancess = sol.getObjects();
                i = 0, len = instancess.length;


                setInterval(function () {
                    for (i = 0, len = instancess.length; i < len; i++) {
                        if (ovoBehaviors.runtime.timescale === 0 && (ovoBehaviors.getMovearea().instances[i].my_timescale < 1 || ovoBehaviors.getMovearea().instances[i].my_timescale > 1)) {
                            ovoBehaviors.getMovearea().instances[i].my_timescale = -1
                        } else (
                            instancess[i].my_timescale = mts), 0
                    }
                });

            }
        },

        angle() {
            pangle = prompt('Change your angle to a number between 1 and 360');
            if (pangle === null || pangle === "" || isNaN(pangle)) {
                alert("Must be a number between 1 and 360, angle reset")
                pangle = 0
                return;
            }
            if (pangle >= 0 && pangle <= 360) {
                setInterval(function () { ovoBehaviors.getPlayer().angle = pangle * (Math.PI / 180); }, 0);
                return;
            } else {
                alert("Must be a number between 1 and 360, angle reset")
                pangle = 0
            }
            return;
        },

        maxspeed() {
            ms = prompt('Change your speed to whatever you want (Warning: this is kind of buggy)');
            clearInterval(speed)
            if (ms === null || ms === "" || isNaN(ms)) {
                alert("Must be a number, speed reset")
                clearInterval(speed)
                return;
            }
            speed = setInterval(function () {
                if (ms === 660) {
                    ms = 660.000000001
                } else if (ms === 700) {
                    ms = 700.000000001
                } else if (ms === 450) {
                    ms = 450.000000001
                } else if (ms === 380) {
                    ms = 380.000000001
                }
                if (ovoBehaviors.getPlayer().behavior_insts[0].maxspeed === 330) {
                    ovoBehaviors.getPlayer().behavior_insts[0].maxspeed = ms
                } else if (ovoBehaviors.getPlayer().behavior_insts[0].maxspeed === 660) {
                    ovoBehaviors.getPlayer().behavior_insts[0].maxspeed = ms * 2
                } else if (ovoBehaviors.getPlayer().behavior_insts[0].maxspeed === 700) {
                    ovoBehaviors.getPlayer().behavior_insts[0].maxspeed = ms * 2.121212123
                } else if (ovoBehaviors.getPlayer().behavior_insts[0].maxspeed === 450) {
                    ovoBehaviors.getPlayer().behavior_insts[0].maxspeed = ms * 1.363636364
                } else if (ovoBehaviors.getPlayer().behavior_insts[0].maxspeed === 380) {
                    ovoBehaviors.getPlayer().behavior_insts[0].maxspeed = ms * 1.151515156
                }
            }, 0);
            return;
        },

        fallspeed() {
            mf = prompt('Change your fallspeed to whatever you want');
            clearInterval(fall)
            if (mf === null || mf === "" || isNaN(mf)) {
                alert("Must be a number, speed reset")
                clearInterval(fall)
                return;
            }
            fall = setInterval(function () { ovoBehaviors.getPlayer().behavior_insts[0].maxFall = parseFloat(mf); }, 0);
            return;
        },


        acceleration() {
            acc = prompt('Change your acceleration to whatever you want');
            if (acc === null || acc === "" || isNaN(acc)) {
                alert("Must be a number, acceleration reset")
                acc = 1500
                return;
            }
            setInterval(function () { ovoBehaviors.getPlayer().behavior_insts[0].acc = parseFloat(acc); }, 0);
            return;
        },

        deceleration() {
            dc = prompt('Change your deceleration to whatever you want')
            clearInterval(dec)
            if (dc === null || dc === "" || isNaN(dc)) {
                alert("Must be a number, deceleration reset")
                clearInterval(dec)
                return;
            }
            dec = setInterval(function () { ovoBehaviors.getPlayer().behavior_insts[0].dec = parseFloat(dc); }, 0);
            return;
        },

        size() {
            width = prompt("Change your width to whatever you want (Show hitboxes to see the change)")
            if (width === null || width === "" || isNaN(width)) {
                alert("Must be a number, width reset");
                width = 32;
            }
            if (width < 0) {
                width = parseFloat(width) - parseFloat(width) * 2
            }
            if (parseFloat(width) === 16) {
                width = 16.00000000000001
            }
            height = prompt("Change your height to whatever you want (Show hitboxes to see the change)")
            if (height === null || height === "" || isNaN(height)) {
                alert("Must be a number, height reset");
                height = 64
            }
            if (parseFloat(width) === 32 && parseFloat(height) === 64) {
                runtime.untickMe(lsize)
            } else {
                runtime.tickMe(lsize)
            }
            if (this.getPlayer().instance_vars[0] === "plunge" || this.getPlayer().instance_vars[0] === "slide") {
                this.getPlayer().width = parseFloat(width) * 2
                this.getPlayer().height = parseFloat(height) / 2
            } else {
                this.getPlayer().width = parseFloat(width)
                this.getPlayer().height = parseFloat(height)
            }
        },

        downx() {
            downx = prompt("Change your downX to whatever you want (I'm sorry but not even I know what this is)")
            if (downx === null || downx === "" || isNaN(downx)) {
                alert("Must be a number, downX reset");
                downx = 0;
            }
            setInterval(function () {
                ovoBehaviors.getPlayer().behavior_insts[0].downx = parseFloat(downx)
            })
        },

        downy() {
            downy = prompt("Change your downY to whatever you want (I'm sorry but not even I know what this is)")
            if (downy === null || downy === "" || isNaN(downy)) {
                alert("Must be a number, downY reset");
                downy = 1;
            }
            setInterval(function () {
                ovoBehaviors.getPlayer().behavior_insts[0].downy = parseFloat(downy)
            })
        },

        zoom() {
            scale = prompt('To start a cycle or continue your current cycle, type "yes". To change it only once and/or stop your current cycle, type "no".')
            if (scale === "yes") {
                scale = prompt("Zoom the camera in or out")
                if (scale === null || scale === "" || isNaN(scale)) {
                    alert("Must be a number, scale reset, cycle continuing")
                    scale = 1
                } else {
                    clearInterval(zoom)
                    zoom = setInterval(function () {
                        ovoBehaviors.Layer0().scale = parseFloat(scale)
                    }, 0)
                }
            } else if (scale === "no") {
                clearInterval(zoom)
                scale = prompt("Zoom the camera in or out")
                if (scale === null || scale === "" || isNaN(scale)) {
                    alert("Must be a number, scale reset")
                    this.Layer0().scale = 1
                } else {
                    this.Layer0().scale = parseFloat(scale)
                }
            } else {
                alert("Please choose from the list")
            }
        },

        dead() {
            dead = prompt("This will put you in death state, meaning you can't die. Unlike when you do this with replays, groundpounding or double/triple jumping do not make you exit death state. Type 'yes' to do this, or type 'stop' to stop it. (This is a bit broken for now, if you exit a level please stop this.)")
            if (dead === "yes") {
                clearInterval(state)
                clearInterval(bordercheck)
                runtime.tickMe(deadstate)
                bordercheck = setInterval(function () {
                    if (ovoBehaviors.getPlayer().y <= ovoBehaviors.runtime.running_layout.height - 1) {
                        clearInterval(dborder)
                        dborder = setInterval(function () {
                            if (dead === "stop") {
                                clearInterval(dborder)
                            } else if (ovoBehaviors.getPlayer().y >= ovoBehaviors.runtime.running_layout.height) {
                                notify("Welp", "There is ONE way to die..."),
                                    clearInterval(dborder)
                            }
                        })
                    }
                })
                return;
            } else if (dead === "stop") {
                runtime.untickMe(deadstate)
                clearInterval(bordercheck)
                this.getPlayer().instance_vars[0] = ""
                return;
            } else if (dead === null || dead === "" || isNaN(dead)) {
                return alert("Please choose from the two options");
            }
        },

        getPlayer() {
            return this.runtime.types_by_index
                .filter(
                    (x) =>
                        !!x.animations &&
                        x.animations[0].frames[0].texture_file.includes("collider")
                )[0]
                .instances.filter(
                    (x) => x.instance_vars[17] === "")[0]
        },

        getMovearea() {
            return runtime.types_by_index.find(x => x.plugin instanceof cr.plugins_.Sprite && x.all_frames && x.all_frames[0].texture_file.includes("movearea"))
        },

        Layer0() {
            return runtime.running_layout.layers.find(x => x.name === "Layer 0")
        },

        isInLevel() {
            return runtime.running_layout.sheetname === "Levels" || runtime.running_layout.name.startsWith("Skin");
        }

    }

    let lsize = {
        tick() {
            if (ovoBehaviors.isInLevel()) {
                let sib = ovoBehaviors.getPlayer().siblings
                if (ovoBehaviors.getPlayer().width <= 0) {
                    sib[0].width = parseFloat(-width) / 8, sib[0].height = parseFloat(height) / 8, sib[1].width = parseFloat(-width) / 8, sib[1].height = parseFloat(height) / 8, sib[2].width = parseFloat(-width) / 8, sib[2].height = parseFloat(height) / 8, sib[3].width = parseFloat(-width), sib[3].height = parseFloat(height) / 2, sib[4].width = parseFloat(-width) / 8, sib[4].height = parseFloat(height) / 8, sib[5].width = parseFloat(-width) / 8, sib[5].height = parseFloat(height) / 8, sib[6].width = parseFloat(-width) / 8, sib[6].height = parseFloat(height) / 8, sib[7].width = parseFloat(-width) / 4, sib[7].height = parseFloat(height) / 4, sib[8].width = parseFloat(-width) / 8, sib[8].height = parseFloat(height) / 8, sib[9].width = parseFloat(-width) / 8, sib[9].height = parseFloat(height) / 8
                } else {
                    sib[0].width = parseFloat(width) / 8, sib[0].height = parseFloat(height) / 8, sib[1].width = parseFloat(width) / 8, sib[1].height = parseFloat(height) / 8, sib[2].width = parseFloat(width) / 8, sib[2].height = parseFloat(height) / 8, sib[3].width = parseFloat(width), sib[3].height = parseFloat(height) / 2, sib[4].width = parseFloat(width) / 8, sib[4].height = parseFloat(height) / 8, sib[5].width = parseFloat(width) / 8, sib[5].height = parseFloat(height) / 8, sib[6].width = parseFloat(width) / 8, sib[6].height = parseFloat(height) / 8, sib[7].width = parseFloat(width) / 4, sib[7].height = parseFloat(height) / 4, sib[8].width = parseFloat(width) / 8, sib[8].height = parseFloat(height) / 8, sib[9].width = parseFloat(width) / 8, sib[9].height = parseFloat(height) / 8
                }
                if (ovoBehaviors.getPlayer().width === parseFloat(width) * 2) {
                    ovoBehaviors.getPlayer().width = parseFloat(width) * 2
                    ovoBehaviors.getPlayer().height = parseFloat(height) / 2
                } else if (ovoBehaviors.getPlayer().width === parseFloat(-width)) {
                    ovoBehaviors.getPlayer().width = parseFloat(-width)
                    ovoBehaviors.getPlayer().height = parseFloat(height)
                } else if (ovoBehaviors.getPlayer().width === parseFloat(-width) * 2) {
                    ovoBehaviors.getPlayer().width = parseFloat(-width) * 2
                    ovoBehaviors.getPlayer().height = parseFloat(height) / 2
                } else {
                    ovoBehaviors.getPlayer().width = parseFloat(width)
                    ovoBehaviors.getPlayer().height = parseFloat(height)
                }
            }
        }
    }



    let deadstate = {
        tick() {
            if (ovoBehaviors.isInLevel()) { ovoBehaviors.getPlayer().instance_vars[0] = "dead" }
        }
    }

    let showProperties = {
        tick() {
            let playerInstances = runtime.types_by_index
                .filter(
                    (x) =>
                        !!x.animations &&
                        x.animations[0].frames[0].texture_file.includes("collider")
                )[0]
                .instances.filter(
                    (x) => x.instance_vars[17] === "" && x.behavior_insts[0].enabled
                );
            let player = playerInstances[0];
            try {
                document.getElementById("fps").innerHTML =
                    "FPS: " + ovoBehaviors.runtime.fps
            } catch (err) { }
            try {
                document.getElementById("coords").innerHTML =
                    Math.round(ovoBehaviors.getPlayer().x) + ", " + Math.round(ovoBehaviors.getPlayer().y)
            } catch (err) { }
            try {
                document.getElementById("speed").innerHTML =
                    "Speed: " + Math.round(ovoBehaviors.getPlayer().behavior_insts[0].dx)
            } catch (err) { }
            try {
                document.getElementById("grav").innerHTML =
                    "Gravity: " + ovoBehaviors.getPlayer().behavior_insts[0].g
            } catch (err) { }
            try {
                document.getElementById("js").innerHTML =
                    "Jump strength: " + ovoBehaviors.getPlayer().behavior_insts[0].jumpStrength
            } catch (err) { }
            try {
                if (ovoBehaviors.getPlayer().my_timescale === -1) {
                    document.getElementById("ts").innerHTML =
                        "Player Timescale: Normal"
                } else {
                    document.getElementById("ts").innerHTML =
                        "Player Timescale: " + ovoBehaviors.getPlayer().my_timescale
                }
            } catch (err) { }
            try {
                if (ovoBehaviors.getMovearea().instances[0].my_timescale === -1) {
                    document.getElementById("mts").innerHTML =
                        "Movearea Timescale: Normal"
                } else {
                    document.getElementById("mts").innerHTML =
                        "Movearea Timescale: " + ovoBehaviors.getMovearea().instances[0].my_timescale
                }
            } catch (err) { }
            try {
                document.getElementById("angle").innerHTML =
                    "Angle: " + Math.round(ovoBehaviors.getPlayer().angle / (Math.PI / 180))
            } catch (err) { }
            try {
                document.getElementById("maxspeed").innerHTML =
                    "Max speed: " + parseInt(ovoBehaviors.getPlayer().behavior_insts[0].maxspeed)
            } catch (err) { }
            try {
                document.getElementById("fall").innerHTML =
                    "Fall speed: " + ovoBehaviors.getPlayer().behavior_insts[0].maxFall
            } catch (err) { }
            try {
                document.getElementById("acc").innerHTML =
                    "Acceleration: " + ovoBehaviors.getPlayer().behavior_insts[0].acc
            } catch (err) { }
            try {
                document.getElementById("dec").innerHTML =
                    "Deceleration: " + ovoBehaviors.getPlayer().behavior_insts[0].dec
            } catch (err) { }
            try {
                if (ovoBehaviors.getPlayer().width === 16.00000000000001) {
                    document.getElementById("size").innerHTML =
                        "Size: " + 16 + ", " + ovoBehaviors.getPlayer().height
                } else if (ovoBehaviors.getPlayer().width === -16.00000000000001) {
                    document.getElementById("size").innerHTML =
                        "Size: " + -16 + ", " + ovoBehaviors.getPlayer().height
                } else if (ovoBehaviors.getPlayer().width === -32.00000000000002) {
                    document.getElementById("size").innerHTML =
                        "Size: " + -32 + ", " + ovoBehaviors.getPlayer().height
                } else if (ovoBehaviors.getPlayer().width === 32.00000000000002) {
                    document.getElementById("size").innerHTML =
                        "Size: " + 32 + ", " + ovoBehaviors.getPlayer().height
                } else {
                    document.getElementById("size").innerHTML =
                        "Size: " + ovoBehaviors.getPlayer().width + ", " + ovoBehaviors.getPlayer().height
                }
            } catch (err) { }
            try {
                document.getElementById("dx").innerHTML =
                    "Downx: " + ovoBehaviors.getPlayer().behavior_insts[0].downx
            } catch (err) { }
            try {
                document.getElementById("dy").innerHTML =
                    "Downy: " + ovoBehaviors.getPlayer().behavior_insts[0].downy
            } catch (err) { }
            try {
                document.getElementById("zoom").innerHTML =
                    "Zoom: " + ovoBehaviors.Layer0().scale
            } catch (err) { }
            try {
                document.getElementById("state").innerHTML =
                    "State: " + ovoBehaviors.getPlayer().instance_vars[0]
            } catch (err) { }
        },
    };



    var bcoords = document.createElement("div"),
        ccoords = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "0px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(ccoords).forEach(function (a) {
        bcoords.style[a] = ccoords[a];
    });
    bcoords.id = "coords";
    const newContentcoords = document.createTextNode("N/A");

    // add the text node to the newly created div
    bcoords.appendChild(newContentcoords);

    document.body.appendChild(bcoords);

    var bx = document.createElement("div"),
        cx = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "45px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cx).forEach(function (a) {
        bx.style[a] = cx[a];
    });
    bx.id = "speed";
    const newContentx = document.createTextNode("Speed: N/A");

    // add the text node to the newly created div
    bx.appendChild(newContentx);

    document.body.appendChild(bx);

    var bg = document.createElement("div"),
        cg = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "90px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cg).forEach(function (a) {
        bg.style[a] = cg[a];
    });
    bg.id = "grav";
    const newContentg = document.createTextNode("Gravity: 1500");

    // add the text node to the newly created div
    bg.appendChild(newContentg);

    document.body.appendChild(bg);

    var bjs = document.createElement("div"),
        cjs = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "135px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cjs).forEach(function (a) {
        bjs.style[a] = cjs[a];
    });
    bjs.id = "js";
    const newContentjs = document.createTextNode("Jump strength: 650");

    // add the text node to the newly created div
    bjs.appendChild(newContentjs);

    document.body.appendChild(bjs);

    var bts = document.createElement("div"),
        cts = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "180px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cts).forEach(function (a) {
        bts.style[a] = cts[a];
    });
    bts.id = "ts";
    const newContentts = document.createTextNode("Player Timescale: Normal");

    // add the text node to the newly created div
    bts.appendChild(newContentts);

    document.body.appendChild(bts);

    var bmts = document.createElement("div"),
        cmts = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "225px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cmts).forEach(function (a) {
        bmts.style[a] = cmts[a];
    });
    bmts.id = "mts";
    const newContentmts = document.createTextNode("Movearea Timescale: Normal");

    // add the text node to the newly created div
    bmts.appendChild(newContentmts);

    document.body.appendChild(bmts);

    var ba = document.createElement("div"),
        ca = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "270px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(ca).forEach(function (a) {
        ba.style[a] = ca[a];
    });
    ba.id = "angle";
    const newContenta = document.createTextNode("Angle: 0");

    // add the text node to the newly created div
    ba.appendChild(newContenta);

    document.body.appendChild(ba);

    var bs = document.createElement("div"),
        cs = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "315px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cs).forEach(function (a) {
        bs.style[a] = cs[a];
    });
    bs.id = "maxspeed";
    const newContents = document.createTextNode("Max speed: 330");

    // add the text node to the newly created div
    bs.appendChild(newContents);

    document.body.appendChild(bs);

    var bf = document.createElement("div"),
        cf = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "360px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cf).forEach(function (a) {
        bf.style[a] = cf[a];
    });
    bf.id = "fall";
    const newContentf = document.createTextNode("Fall speed: 3000");

    // add the text node to the newly created div
    bf.appendChild(newContentf);

    document.body.appendChild(bf);

    var bac = document.createElement("div"),
        cac = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "405px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cac).forEach(function (a) {
        bac.style[a] = cac[a];
    });
    bac.id = "acc";
    const newContentac = document.createTextNode("Acceleration: 1500");

    // add the text node to the newly created div
    bac.appendChild(newContentac);

    document.body.appendChild(bac);

    var bdc = document.createElement("div"),
        cdc = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "450px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cdc).forEach(function (a) {
        bdc.style[a] = cdc[a];
    });
    bdc.id = "dec";
    const newContentdc = document.createTextNode("Deceleration: 1500");

    // add the text node to the newly created div
    bdc.appendChild(newContentdc);

    document.body.appendChild(bdc);

    var bz = document.createElement("div"),
        cz = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "495px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cz).forEach(function (a) {
        bz.style[a] = cz[a];
    });
    bz.id = "size";
    const newContentcz = document.createTextNode("Size: 32, 64");

    // add the text node to the newly created div
    bz.appendChild(newContentcz);

    document.body.appendChild(bz);

    var bdx = document.createElement("div"),
        cdx = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "540px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cdx).forEach(function (a) {
        bdx.style[a] = cdx[a];
    });
    bdx.id = "dx";
    const newContentdx = document.createTextNode("Downx: 0");

    // add the text node to the newly created div
    bdx.appendChild(newContentdx);

    document.body.appendChild(bdx);

    var bdy = document.createElement("div"),
        cdy = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "585px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cdy).forEach(function (a) {
        bdy.style[a] = cdy[a];
    });
    bdy.id = "dy";
    const newContentdy = document.createTextNode("Downy: 1");

    // add the text node to the newly created div
    bdy.appendChild(newContentdy);

    document.body.appendChild(bdy);

    var bzm = document.createElement("div"),
        czm = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "630px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(czm).forEach(function (a) {
        bzm.style[a] = czm[a];
    });
    bzm.id = "zoom";
    const newContentzm = document.createTextNode("Zoom: 1");

    // add the text node to the newly created div
    bzm.appendChild(newContentzm);

    document.body.appendChild(bzm);

    var bfps = document.createElement("div"),
        cfps = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "100px",
            left: "1276.5px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cfps).forEach(function (a) {
        bfps.style[a] = cfps[a];
    });
    bfps.id = "fps";
    const newContentfps = document.createTextNode("FPS: 0");

    // add the text node to the newly created div
    bfps.appendChild(newContentfps);

    document.body.appendChild(bfps);

    var bstate = document.createElement("div"),
        cstate = {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            border: "solid",
            borderColor: "black",
            borderWidth: "1px",
            fontFamily: "Retron2000",
            position: "absolute",
            top: "675px",
            left: "0px",
            padding: "10px",
            color: "black",
            fontSize: "13pt",
        };
    Object.keys(cstate).forEach(function (a) {
        bstate.style[a] = cstate[a];
    });
    bstate.id = "state";
    const newContentstate = document.createTextNode("State: N/A");

    // add the text node to the newly created div
    bstate.appendChild(newContentstate);

    document.body.appendChild(bstate);

    behaviors.init();
})();
