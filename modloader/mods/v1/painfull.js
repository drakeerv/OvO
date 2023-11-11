(function () {
    const old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    const runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;

    const getLayer = () => {
        return runtime.running_layout.layers.find(x => x.name === "Layer 0");
    }

    const isInLevel = () => {
        return runtime.running_layout.name.startsWith("Level")
    }

    const painfullMod = {
        init() {
            this.activated = false;
            this.camera = null;
            this.scale = -3;
            
            runtime.tickMe(this);
            globalThis.ovoPainfull = this;
        },

        tick() {
            if (isInLevel()) {
                getLayer().scale = this.scale;
            }
        }
    };

    painfullMod.init();
})();