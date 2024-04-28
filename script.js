const fontSizeInput = document.querySelector("#fontsize");
const fontColorInput = document.querySelector("#fontcolor");
const btn = document.querySelector('input[type="submit"]');

btn.addEventListener("click", (e) => { 
    document.body.style.fontSize = fontSizeInput.value + "px";
    document.body.style.color = fontColorInput.value;

    setCookie("fontsize", fontSizeInput.value, 365);
    setCookie("fontcolor", fontColorInput.value, 365);
});

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function loadPreferences() {
    let fontSize = getCookie("fontsize"); // Corrected the cookie name here
    let fontColor = getCookie("fontcolor"); // Corrected the cookie name here

    // Apply preferences if cookies exist
    if (fontSize) {
        document.body.style.fontSize = fontSize + "px";
        fontSizeInput.value = fontSize;
    }

    if (fontColor) {
        document.body.style.color = fontColor;
        fontColorInput.value = fontColor;
    }
}

// Call loadPreferences on page load
window.onload = loadPreferences;