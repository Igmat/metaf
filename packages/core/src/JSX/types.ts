import MetaFHTML from './HTML';
import { MetaFSVG } from './SVG';

//
// Component API
// ----------------------------------------------------------------------
// `any` used here, because all other types won't allow TS to properly narrow the type based on usage
// could be probably fixed by future versions of TS, which will use createElement signature for JSX
// tslint:disable-next-line:no-any
export type SFC<P extends object = any, C extends unknown[] = any[]> = (props: P, ...children: C) => MetaFNode | MetaFChild | null;
// tslint:disable-next-line:no-any
export interface Renderable<P extends object = any, C extends unknown[] = any[]> {
    render: SFC<P, C>;
}
//
// MetaF Element
// ----------------------------------------------------------------------
export type InferProps<T extends RenderableType> =
    T extends keyof MetaFHTML
    ? MetaFHTML[T]
    : T extends keyof MetaFSVG
    ? MetaFSVG[T]
    : T extends Renderable<infer ComponentProps, infer ComponentChild>
    ? ComponentProps
    : T extends SFC<infer SFCProps, infer SFCChild>
    ? SFCProps
    : {};
export type InferChild<T extends RenderableType> =
    T extends keyof MetaFHTML | MetaFSVG
    ? MetaFNode
    : T extends Renderable<infer ComponentProps, infer ComponentChild>
    ? ComponentChild
    : T extends SFC<infer SFCProps, infer SFCChild>
    ? SFCChild
    : never[];
export type RenderableType =
    SFC |
    Renderable |
    keyof MetaFHTML |
    keyof MetaFSVG;
export interface MetaFElement<T extends RenderableType = RenderableType> {
    type: T;
    props: InferProps<T>;
    children: InferChild<T>;
}
//
// MetaF Nodes
// ----------------------------------------------------------------------
export type MetaFText = string | number;
export type MetaFChild = MetaFElement | MetaFText | null;
export type MetaFNode = MetaFChild[];
