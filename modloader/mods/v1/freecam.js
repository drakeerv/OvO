// this.runtime = cr_getC2Runtime();
// this.camera = ovoModAPI.game.createSprite(445, 275, null, null, 0, "camera", ovoModAPI.game.getLayer());
// this.layer = this.runtime.running_layout.layers.find(x => x.name === "Layer 0")
// this.layer.instances.includes(this.camera);

(function () {
    const old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    const runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;

    const getPlayer = () => {
        return runtime.types_by_index
            .filter(
                (x) =>
                    !!x.animations &&
                    x.animations[0].frames[0].texture_file.includes("collider")
            )[0]
            .instances.filter(
                (x) => x.instance_vars[17] === "" && x.behavior_insts[0].enabled
            )[0];
    }

    const getLayer = () => {
        return runtime.running_layout.layers.find(x => x.name === "Layer 0");
    }

    const createCamera = (x, y) => {
        const spriteType = runtime.types_by_index.find(x => x.plugin instanceof cr.plugins_.Sprite && x.all_frames && x.all_frames[0].texture_file.includes("camera"));

        const sprite = runtime.createInstance(spriteType, getLayer(), x, y);
        sprite.set_bbox_changed();
        return sprite;
    }

    const notify = (title, text, image = "./speedrunner.png") => {
        cr.plugins_.sirg_notifications.prototype.acts.AddSimpleNotification.call(
            runtime.types_by_index.find(
                (type) => type.plugin instanceof cr.plugins_.sirg_notifications
            ).instances[0],
            title,
            text,
            image
        );
    };

    const freecamMod = {
        init() {
            this.movementKeys = [false, false, false, false];
            this.activatorKeyHeld = false;
            this.activated = false;
            this.override = false;
            this.retach = false;
            this.camera = null;

            document.addEventListener("keydown", (event) => { this.keyDown(event) });
            document.addEventListener("keyup", (event) => { this.keyUp(event) });
            document.addEventListener("keypress", (event) => { this.keyPress(event) });

            runtime.tickMe(this);

            globalThis.ovoFreecamMod = this;
        },

        keyDown(event) {
            const key = event.key.toLowerCase();

            if (key == "shift" && !this.override) {
                this.activatorKeyHeld = true;
            } else if (event.keyCode >= 37 && event.keyCode <= 40 && this.activatorKeyHeld) {
                if (!this.activated) {
                    this.startActivation();
                    this.activated = true;
                }

                this.movementKeys[event.keyCode - 37] = true;
            }
        },

        keyUp(event) {
            const key = event.key.toLowerCase();

            if (key == "shift" && this.activatorKeyHeld) {
                this.activatorKeyHeld = false;

                if (this.activated) {
                    this.movementKeys = [false, false, false, false];
                    this.activated = false;
                    this.endActivation();
                }
            } else if (event.keyCode >= 37 && event.keyCode <= 40 && this.activatorKeyHeld) {
                this.movementKeys[event.keyCode - 37] = false;
            }
        },

        keyPress(event) {
            const key = event.key.toLowerCase();

            if (key == "q" && this.activatorKeyHeld) {
                this.retach = !this.retach;
                notify("Freecam Mod", `Camera Retach ${this.retach ? "Enabled" : "Disabled"}`);
            }
        },

        startActivation() {
            this.player = getPlayer();

            if (!this.camera) {
                this.camera = createCamera(this.player.x, this.player.y);
            }

            notify("Freecam Mod", "Freecam Enabled");
        },

        endActivation() {
            notify("Freecam Mod", "Freecam Disabled");
        },

        tick() {
            const layer = getLayer();

            if (!layer.instances.includes(this.camera)) {
                this.camera = null;
                this.activated = false;
            }

            if (!this.activated) {
                if (this.camera && this.retach) {
                    this.camera.x = this.player.x;
                    this.camera.y = this.player.y;
                }
            }
        }
    };

    freecamMod.init();
})();