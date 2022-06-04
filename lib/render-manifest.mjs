import LayoutAbout from "../src/pages/LayoutAbout.mjs";
import LayoutIndex from "../src/pages/LayoutIndex.mjs";

const renderManifest = {
  "./www/about.mjs": LayoutAbout,
  "./www/index.mjs": LayoutIndex,
};

export default renderManifest;
