import { createElement } from './createElement';
import MetaFHTML from './HTML';
import { MetaFSVG } from './SVG';
import { MetaFChild } from './types';

export const MetaF = {
    createElement,
};

// FIXME: hack for current jsx resolution mechanism
// tslint:disable-next-line:no-namespace
export namespace MetaF {
    export namespace JSX {
        export type Element = MetaFChild;
        // FIXME: hack for current jsx resolution mechanism
        export interface IntrinsicElements extends MetaFHTML, MetaFSVG {
        }
    }

}
