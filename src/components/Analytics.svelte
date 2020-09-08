<script>
  import { stores } from "@sapper/app";
  import * as env from "../environment.js";

  function loadFathom() {
    // Default fathom tracking script
    (function (f, a, t, h, o, m) {
      a[h] =
        a[h] ||
        function () {
          (a[h].q = a[h].q || []).push(arguments);
        };
      (o = f.createElement("script")),
        (m = f.getElementsByTagName("script")[0]);
      o.async = 1;
      o.src = t;
      o.id = "fathom-script";
      m.parentNode.insertBefore(o, m);
    })(document, window, "//beacon.yanglinzhao.com/tracker.js", "fathom");
  }

  if (env.__CLIENT__) {
    loadFathom();
    window.fathom("set", "siteId", env.FATHOM_SITE_ID);
  }

  const { page } = stores();
  page.subscribe(() => {
    // The site is an SPA, with client side navigation
    // We need to track these events manually
    if (env.__CLIENT__) {
      window.fathom("trackPageview");
    }
  });
</script>
