(async () => {
    const v1ModsList = document.getElementById("v1-mods");
    const v2ModsList = document.getElementById("v2-mods");

    if (v1ModsList && v2ModsList) {
        const classes = ["bg-black", "text-light", "list-group-item", "list-group-item-action", "list-group-item-dark", "clickable-copy", "hover-pulse"];

        const v1Mods = await fetch("modloader/mods/v1.json").then(r => r.json());
        const v2Mods = await fetch("modloader/mods/v2.json").then(r => r.json());

        for (let key in v1Mods) {
            const mod = v1Mods[key];

            const listEntry = document.createElement("li");
            listEntry.classList.add(...classes);
            listEntry.setAttribute("copy", key);
            listEntry.innerHTML = `${mod.name} (${key})`
            v1ModsList.appendChild(listEntry);
        }

        for (let key in v2Mods) {
            const mod = v2Mods[key];

            const listEntry = document.createElement("li");
            listEntry.classList.add(...classes);
            listEntry.setAttribute("copy", key);
            listEntry.innerHTML = `${mod.name} (${key})`
            v2ModsList.appendChild(listEntry);
        }
    }

    const links = document.getElementsByClassName("clickable-link");
    for (var i = 0; i < links.length; i++) {
        let link = links[i];
        link.addEventListener("click", () => {
            window.open(link.getAttribute("link"), "_blank");

            let text = link.innerHTML;
            link.innerHTML = "Opened!";
            setTimeout(() => {
                link.innerHTML = text;
            }, 1000);
        });
    }

    const copies = document.getElementsByClassName("clickable-copy");
    for (var i = 0; i < copies.length; i++) {
        let copy = copies[i];
        copy.addEventListener("click", () => {
            copyTextToClipboard(copy.getAttribute("copy"));

            let text = copy.innerHTML;
            copy.innerHTML = "Copied!";
            setTimeout(() => {
                copy.innerHTML = text;
            }, 1000);
        });
    }

    const hoverPulses = document.getElementsByClassName("hover-pulse");
    for (let i = 0; i <= hoverPulses.length; i++) {
        let hoverPulse = hoverPulses[i];

        if (hoverPulse) {
            hoverPulse.addEventListener("animationend", function(e) {
                hoverPulse.classList.remove("hover-pulse-animation");
            });

            hoverPulse.addEventListener("mouseover", function(e) {
                hoverPulse.classList.add("hover-pulse-animation")
            });
        }
    }

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    }

    function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text);
    }
})();