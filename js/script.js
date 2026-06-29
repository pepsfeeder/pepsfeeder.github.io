// Dark mode toggle

var toggle = document.getElementById("dark-mode-toggle");
var darkTheme = document.getElementById("dark-mode-theme");
var stored = localStorage.getItem("dark-mode-storage");

// On first visit, respect OS preference
if (stored === null) {
  stored = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

setTheme(stored);

toggle.addEventListener("change", function () {
  setTheme(toggle.checked ? "dark" : "light");
});

function setTheme(mode) {
  localStorage.setItem("dark-mode-storage", mode);
  var isDark = mode === "dark";
  darkTheme.disabled = !isDark;
  toggle.checked = isDark;
}

// Managing cookies
function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

var consent = getCookie("consent-settings")