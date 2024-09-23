import { p as parser$1, f as flowDb } from './flowDb-c1833063-ZiHPSo5x.js';
import { f as flowRendererV2, g as flowStyles } from './styles-483fbfea-7C_XA-tf.js';
import { at as setConfig } from './index-kl-8wE1s.js';
import './graph-cLjQPPvK.js';
import './layout-OWUoPk3f.js';
import './index-01f381cb-uyyMY4IY.js';
import './clone-aJmnNy8N.js';
import './edges-066a5561-ij53LX0_.js';
import './createText-ca0c5216--ZKTPxVd.js';
import './line-b4A7OS9R.js';
import './array-BzZpbL2z.js';
import './path-I1yyCG-g.js';
import './channel-_7zFdLVD.js';

const diagram = {
  parser: parser$1,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};

export { diagram };
