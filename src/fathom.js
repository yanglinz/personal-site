// Modified version of default fathom lite script

!(function () {
  if (typeof window === "undefined") {
    return;
  }

  var t = this,
    e = (window.fathom && window.fathom.q) || [],
    h = { siteId: "", trackerUrl: "" },
    n = {
      set: r,
      trackPageview: function e(t) {
        t = t || {};
        if ("doNotTrack" in navigator && "1" === navigator.doNotTrack) return;
        if (
          "visibilityState" in document &&
          "prerender" === document.visibilityState
        )
          return;
        if (null === document.body)
          return void document.addEventListener(
            "DOMContentLoaded",
            function () {
              e(t);
            }
          );
        var n = window.location;
        if ("" === n.host) return;
        var r = document.querySelector('link[rel="canonical"][href]');
        if (r) {
          var o = document.createElement("a");
          (o.href = r.href), (n = o);
        }
        var i = t.path || n.pathname + n.search;
        i || (i = "/");
        var a = t.hostname || n.protocol + "//" + n.hostname;
        var c = t.referrer || "";
        document.referrer.indexOf(a) < 0 && (c = document.referrer);
        var s = (function () {
          var e = new Date();
          e.setMinutes(e.getMinutes() - 30);
          var t = (function (e) {
            for (
              var t = document.cookie ? document.cookie.split("; ") : [], n = 0;
              n < t.length;
              n++
            ) {
              var r = t[n].split("=");
              if (decodeURIComponent(r[0]) === e) {
                var o = r.slice(1).join("=");
                return decodeURIComponent(o);
              }
            }
            return "";
          })("_fathom");
          if (!t) return w();
          try {
            t = JSON.parse(t);
          } catch (e) {
            return console.error(e), w();
          }
          t.lastSeen < +e && (t.isNewSession = !0);
          return t;
        })();
        var d = {
          id:
            ((u = 20),
            (l =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"),
            Array(u)
              .join()
              .split(",")
              .map(function () {
                return l.charAt(Math.floor(Math.random() * l.length));
              })
              .join("")),
          pid: s.previousPageviewId || "",
          p: i,
          h: a,
          r: c,
          u: -1 == s.pagesViewed.indexOf(i) ? 1 : 0,
          nv: s.isNewVisitor ? 1 : 0,
          ns: s.isNewSession ? 1 : 0,
          sid: h.siteId,
        };
        var u, l;
        var p =
          h.trackerUrl ||
          ((f = document.getElementById("fathom-script")),
          f ? f.src.replace("tracker.js", "collect") : "");
        var f;
        var m = document.createElement("img");
        m.setAttribute("alt", "");
        m.setAttribute("aria-hidden", "true");
        m.src =
          p +
          ((v = d),
          "?" +
            Object.keys(v)
              .map(function (e) {
                return encodeURIComponent(e) + "=" + encodeURIComponent(v[e]);
              })
              .join("&"));
        var v;
        m.addEventListener("load", function () {
          var e = new Date(),
            t = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 24, 0, 0);
          -1 == s.pagesViewed.indexOf(i) && s.pagesViewed.push(i),
            (s.previousPageviewId = d.id),
            (s.isNewVisitor = !1),
            (s.isNewSession = !1),
            (s.lastSeen = +new Date()),
            (function (e, t, n) {
              (e = encodeURIComponent(e)), (t = encodeURIComponent(String(t)));
              var r = e + "=" + t;
              n.path && (r += ";path=" + n.path);
              n.expires && (r += ";expires=" + n.expires.toUTCString());
              document.cookie = r;
            })("_fathom", JSON.stringify(s), { expires: t, path: "/" }),
            document.body.removeChild(m);
        });
        window.setTimeout(function () {
          m.parentNode && ((m.src = ""), document.body.removeChild(m));
        }, 1e3);
        document.body.appendChild(m);
      },
      setTrackerUrl: function (e) {
        return r("trackerUrl", e);
      },
    };
  function r(e, t) {
    h[e] = t;
  }
  function w() {
    return {
      isNewVisitor: !0,
      isNewSession: !0,
      pagesViewed: [],
      previousPageviewId: "",
      lastSeen: +new Date(),
    };
  }
  (window.fathom = function () {
    var e = [].slice.call(arguments),
      t = e.shift();
    n[t].apply(this, e);
  }),
    e.forEach(function (e) {
      return fathom.apply(t, e);
    });
})();

const fathomShim = () => {};
const fathom = typeof window === "undefined" ? fathomShim : window.fathom;
export default fathom;
