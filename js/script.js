// Dark mode toggle

var toggle = document.getElementById("dark-mode-toggle");
var darkTheme = document.getElementById("dark-mode-theme");
var savedTheme = localStorage.getItem("dark-mode-storage") || "light";

// Set initial state of the checkbox and theme
setTheme(savedTheme);

toggle.addEventListener("change", () => { // Use 'change' event for checkboxes
    if (toggle.checked) {
        setTheme("dark");
    } else {
        setTheme("light");
    }
});

function setTheme(mode) {
    localStorage.setItem("dark-mode-storage", mode);
    if (mode === "dark") {
        darkTheme.disabled = false;
        toggle.checked = true; // Set checkbox to checked
    } else if (mode === "light") {
        darkTheme.disabled = true;
        toggle.checked = false; // Set checkbox to unchecked
    }
}

// Managing cookies
function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

var consent = getCookie("consent-settings")