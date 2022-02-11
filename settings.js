let allowAnalytics = document.getElementById("allowAnalytics");

if (window.localStorage) {
    let storage = window.localStorage;
    
    if (!!allowAnalytics) {
        let alreadyAllowedAnalytics = storage.getItem("allowAnalytics");
        alert(alreadyAllowedAnalytics);
    }
}