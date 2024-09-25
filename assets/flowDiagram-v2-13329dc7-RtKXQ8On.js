import { p as parser$1, f as flowDb } from './flowDb-c1833063-YtLXplsb.js';
import { f as flowRendererV2, g as flowStyles } from './styles-483fbfea-hNK5NBnq.js';
import { at as setConfig } from './index-I1I9Vd1M.js';
import './graph-7ZTfqXTM.js';
import './layout-NznWyLrC.js';
import './index-01f381cb-nnzUky2x.js';
import './clone-Qe3FEoXL.js';
import './edges-066a5561-mJCSCbvb.js';
import './createText-ca0c5216-95iCMfzv.js';
import './line-c7K3SZYZ.js';
import './array-BzZpbL2z.js';
import './path-I1yyCG-g.js';
import './channel-6IEyyZ73.js';

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
