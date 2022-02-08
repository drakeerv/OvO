let links = document.getElementsByClassName("clickable-link");
for (var i = 0; i < links.length; i++) {
    let link = links[i];
    link.addEventListener("click", () => {
        window.open(link.getAttribute("href"),"_blank");
        alert(link.getAttribute("href"));
    });
}