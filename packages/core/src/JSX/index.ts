import { createElement } from './createElement';
import MetaFHTML from './HTML';
import { MetaFSVG } from './SVG';

const MetaF = {
    createElement,
};

// tslint:disable-next-line:no-namespace
namespace MetaF {
    export namespace JSX {
        // tslint:disable-next-line:no-empty-interface
        export interface IntrinsicElements extends MetaFHTML, MetaFSVG {
        }
    }

}

export { MetaF };
