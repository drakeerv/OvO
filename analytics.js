if (window.localStorage) {
    var allowAnalytics = window.localStorage.getItem("allowAnalytics");
    if (null === allowAnalytics && (allowAnalytics = "true"), "true" === allowAnalytics) {
        function gtag() {
            dataLayer.push(arguments)
        }
        window.dataLayer = window.dataLayer || [], gtag("js", new Date);
        const a = {
                "ovo.drakefletcher2.repl.co": "G-FYYGF5JH2F",
                "ovo-modded.netlify.app": "G-VE92Z9GXT8",
                "ovo.drakeerv.com": "G-ZSPL1SPBYM",
                "ovo-5yu.pages.dev": "G-CKWDTVZ685",
                "ovo-modloader.github.io": "G-KNTWWPQSG2",
                "ovo.onrender.com": "G-9HX201XE1D",
                "ovo-alpha.vercel.app": "G-X45WR1XH0B"
            },
            o = window.location.hostname.toLowerCase();
        a[o] && gtag("config", a[o])
    }
}