export const __CLIENT__ = typeof window !== "undefined";
export const __SERVER__ = !__CLIENT__;

export let FATHOM_SITE_ID = "XVGSX";
if (__CLIENT__ && window.location.host === "yanglinzhao.com") {
  FATHOM_SITE_ID = "JTCNG";
}
