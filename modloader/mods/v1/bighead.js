(function () {
    const old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    const runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;

    const getLayer = () => {
        return runtime.running_layout.layers.find(x => x.name === "Layer 0");
    }

    const getHead = () => {
        return getLayer().instances.find(x => x.type.name === "t33");
    }

    const isInLevel = () => {
        return runtime.running_layout.sheetname == "Levels";
    }

    const bigheadMod = {
        init() {
            this.scale = 2;
            this.width = 32 * this.scale;
            this.height = 32 * this.scale;
            
            runtime.tickMe(this);
            globalThis.ovoBighead = this;
        },

        tick() {
            if (isInLevel()) {
                const head = getHead();
                head.width = this.width;
                head.height = this.height;
            }
        }
    };

    bigheadMod.init();
})();