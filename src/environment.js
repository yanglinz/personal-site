export const __CLIENT__ = typeof window !== "undefined";
export const __SERVER__ = !__CLIENT__;

export const GRAPHQL_URL =
  "https://5j4fmtcb.api.sanity.io/v1/graphql/production/default";

export let FATHOM_SITE_ID = "XVGSX";
if (__CLIENT__ && window.location.host === "yanglinzhao.com") {
  FATHOM_SITE_ID = "JTCNG";
}
