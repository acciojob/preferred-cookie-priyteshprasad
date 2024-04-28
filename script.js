document.addEventListener("DOMContentLoaded", function() {
  // Function to set the font size and color based on cookies
  function applyPreferencesFromCookies() {
    const fontSizeCookie = getCookie("fontSize");
    const fontColorCookie = getCookie("fontColor");

    if (fontSizeCookie) {
      document.body.style.fontSize = fontSizeCookie + "px";
      document.getElementById("fontsize").value = fontSizeCookie;
    }

    if (fontColorCookie) {
      document.body.style.color = fontColorCookie;
      document.getElementById("fontcolor").value = fontColorCookie;
    }
  }

  // Function to save preferences as cookies
  function savePreferences() {
    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    // Set cookies with expiry date 1 year from now
    setCookie("fontSize", fontSize, 365);
    setCookie("fontColor", fontColor, 365);

    // Apply the preferences immediately
    applyPreferencesFromCookies();
  }

  // Event listener for form submission
  document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    savePreferences(); // Save preferences when the form is submitted
  });

  // Function to set cookie
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  // Function to get cookie value by name
  function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let cookie of cookieArray) {
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      } 
    }
    return null; 
  }

  // Apply preferences when the page loads
  applyPreferencesFromCookies();
});
