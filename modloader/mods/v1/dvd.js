(function () {
    const dvdMod = {
        init() {
            document.body.innerHTML = "";

            this.iframe = document.createElement("iframe");
            this.iframe.src = window.location.href;
            this.iframe.style.width = "50vw";
            this.iframe.style.height = "50vh";
            this.iframe.style.border = "none";
            this.iframe.style.position = "absolute";
            document.body.appendChild(this.iframe);

            this.x = 0;
            this.y = 0;
            this.dx = 1;
            this.dy = 1;

            setInterval(() => {
                this.iframe.style.left = this.x + "px";
                this.iframe.style.top = this.y + "px";

                this.x += this.dx;
                this.y += this.dy;

                if (this.x + this.iframe.clientWidth >= window.innerWidth) {
                    this.dx = -1;
                } else if (this.x <= 0) {
                    this.dx = 1;
                }

                if (this.y + this.iframe.clientHeight >= window.innerHeight) {
                    this.dy = -1;
                } else if (this.y <= 0) {
                    this.dy = 1;
                }
            }, 1);

            globalThis.ovoDvd = this;
        },
    };

    dvdMod.init();
})();