(function () {
    const old = globalThis.sdk_runtime;
    c2_callFunction("execCode", ["globalThis.sdk_runtime = this.runtime"]);
    const runtime = globalThis.sdk_runtime;
    globalThis.sdk_runtime = old;
    const gl = runtime.gl;

    const recordMod = {
        init() {
            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d", {
                alpha: false,
            });
            this.framebuffer = gl.createFramebuffer();

            this.popup = window.open("", "popup", "width=800,height=600");
            this.popup.document.body.style.margin = "0";
            this.popup.document.body.style.overflow = "hidden";
            this.popup.document.body.style.background = "black";

            this.popup.document.body.appendChild(this.canvas);
            this.canvas.style.transform = "scaleY(-1)";

            runtime.tickMe(this);
            globalThis.ovoRecord = this;
        },

        createImageFromTexture() {
            // get texture data
            const texture = runtime.layout_tex;
            const width = texture.c2width;
            const height = texture.c2height;
    
            // Create a framebuffer backed by the texture
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        
            // Read the contents of the framebuffer
            const data = new Uint8ClampedArray(width * height * 4);
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
        
            // Create a 2D canvas to store the result 
            this.canvas.width = width;
            this.canvas.height = height;
        
            // Copy the pixels to a 2D canvas
            const imageData = new ImageData(data, width, height);
            this.context.putImageData(imageData, 0, 0);
        },

        tick() {
            this.createImageFromTexture();
        }
    };

    recordMod.init();
})();