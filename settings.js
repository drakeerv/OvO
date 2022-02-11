let allowAnalytics = document.getElementById("allowAnalytics");

if (window.localStorage) {
    let storage = window.localStorage;
    
    if (!!allowAnalytics) {
        let alreadyAllowedAnalytics = storage.getItem("allowAnalytics");
        alert(alreadyAllowedAnalytics);
        
        if (alreadyAllowedAnalytics === null) {
            storage.setItem("allowAnalytics", true);
        } else {
            allowAnalytics.checked = !!alreadyAllowedAnalytics;
        }

        allowAnalytics.addEventListener("change", (event) => {
            storage.setItem("allowAnalytics", event.currentTarget.checked);
        });
    }
}