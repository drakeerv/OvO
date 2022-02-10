//Admin Dashboard, Navbar, signin, light dark toggle

let links = document.getElementsByClassName("clickable-link");
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

let copies = document.getElementsByClassName("clickable-copy");
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

let hoverPulses = document.getElementsByClassName("hover-pulse");
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
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}