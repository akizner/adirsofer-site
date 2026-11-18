(function () {
  "use strict";
  var el = document.getElementById("freq-value");
  if (!el) return;
  var bar = document.querySelector(".statusbar");
  var flag = document.getElementById("freq-flag");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = "50.00";
    return;
  }

  function render() {
    var root = document.documentElement;
    var max = root.scrollHeight - root.clientHeight;
    var p = max <= 0 ? 0 : Math.min(1, Math.max(0, root.scrollTop / max));
    var hz = 50 - 0.13 * p;
    if (p === 0) hz += Math.random() * 0.04 - 0.02;
    el.textContent = hz.toFixed(2);
    var eea = hz <= 49.9;
    if (bar) bar.classList.toggle("eea-2", eea);
    if (flag) flag.textContent = eea ? " · EEA-2" : "";
  }

  function goBottom() {
    var r = document.documentElement;
    var max = r.scrollHeight - r.clientHeight;
    if (max > 0) window.scrollTo(0, max);
    render();
  }
  window.addEventListener("scroll", render, { passive: true });
  window.addEventListener("resize", render);
  if (location.hash === "#bottom") {
    goBottom();
    window.addEventListener("load", goBottom);
  } else {
    render();
  }
  window.setInterval(function () {
    if (document.documentElement.scrollTop === 0) render();
  }, 2500);
})();
