import { ao as _, ap as Color } from './index-I1I9Vd1M.js';

/* IMPORT */
/* MAIN */
const channel = (color, channel) => {
    return _.lang.round(Color.parse(color)[channel]);
};
/* EXPORT */
const channel$1 = channel;

export { channel$1 as c };
