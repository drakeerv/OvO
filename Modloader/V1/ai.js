(function() {
    // Get runtime
    let old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    let runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;

    // Util stuff
    let notify = (title, text, image = "./speedrunner.png") => {
        cr.plugins_.sirg_notifications.prototype.acts.AddSimpleNotification.call(
            runtime.types_by_index.find(
                (type) => type.plugin instanceof cr.plugins_.sirg_notifications
            ).instances[0],
            title,
            text,
            image
        );
    };

    let addScript = (src, id, onload) => {
        if (document.getElementById(id)) return;
        let fjs = document.getElementsByTagName("script")[0];
        let js = document.createElement("script");
        js.id = id;
        fjs.parentNode.insertBefore(js, fjs);
        js.onload = onload;
        js.src = src;
    };

    let getPlayer = () =>
        playerType.instances.filter(
            (x) => x.instance_vars[17] === "" && x.behavior_insts[0].enabled
        )[0];

    let ai = {
        init () {
            runtime.tickMe(this);

            this.network_config = {hiddenLayers: [3, 4, 5]};
            this.train_config = {log: false};
            this.enabled = false;
            this.threshold = 0.5;

            this.network = new brain.NeuralNetwork(this.network_config);
            this.network.train({input: {}, output: {up: 0, down: 1, left: 0, right: 0, restart: 0}}, this.train_config); // figure out what data to send, possible position, solid, flag, spike

            notify("Mod loaded", "AI mod loaded");
            globalThis.ovoAi = this;
        },
        playInputs (inputs) {
            inputs.forEach((input) => {
                if (input.restart > this.threshold) c2_callFunction("Menu > Replay");
                else if (input.up > this.threshold) c2_callFunction("Controls > Buffer", ["Jump"]);
                else if (input.down > this.threshold) c2_callFunction("Controls > Down");
                else if (input.left > this.threshold) c2_callFunction("Controls > Left");
                else if (input.right > this.threshold) c2_callFunction("Controls > Right");
            });  
        },
        tick () {
            if (this.enabled) {
                this.playInputs(this.network.run({}));
            }
        },
        start () {
            this.enabled = true;
        },
        stop () {
            this.enabled = false;
        }
    };

    addScript("https://unpkg.com/brain.js@latest/dist/brain-browser.min.js", "brainJs", ai.init.bind(ai))
})():