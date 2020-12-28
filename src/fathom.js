function loadFathom() {
  if (typeof window === "undefined") return;

  // Default fathom tracking script
  (function (f, a, t, h, o, m) {
    a[h] =
      a[h] ||
      function () {
        (a[h].q = a[h].q || []).push(arguments);
      };
    (o = f.createElement("script")), (m = f.getElementsByTagName("script")[0]);
    o.async = 1;
    o.src = t;
    o.id = "fathom-script";
    m.parentNode.insertBefore(o, m);
  })(document, window, "//beacon.yanglinzhao.com/tracker.js", "fathom");
}

loadFathom();

function fathom(...args) {
  if (typeof window === "undefined") return;
  window.fathom(...args);
}

export default fathom;
