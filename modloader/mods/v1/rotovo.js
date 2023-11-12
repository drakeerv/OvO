(function () {
    const old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    const runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;

    const getLayers = () => {
        return runtime.running_layout.layers;
    };
    const degreeToRadian = (angle) => {
        return angle * (Math.PI / 180);
    };

    const rotovoMod = {
        init() {
            this.angle = 0;

            runtime.tickMe(this);
            globalThis.ovoRotovo = this;
        },

        tick() {
            getLayers().forEach(layer => {
                layer.angle = degreeToRadian(this.angle);
            })
            this.angle += 1;
        }
    };

    rotovoMod.init();
})();