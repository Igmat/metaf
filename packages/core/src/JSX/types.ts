import MetaFHTML from './HTML';
import { MetaFSVG } from './SVG';

//
// Component API
// ----------------------------------------------------------------------
// `any` used here, because all other types won't allow TS to properly narrow the type based on usage
// could be probably fixed by future versions of TS, which will use createElement signature for JSX
export type SFC<P extends object = object, C extends unknown[] = unknown[]> = (props: P, ...children: C) => MetaFNode | MetaFChild | null;

export interface Renderable<P extends object = object, C extends unknown[] = unknown[]> {
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
    : object;
export type InferChild<T extends RenderableType> =
    T extends keyof MetaFHTML | MetaFSVG
    ? MetaFNode
    : T extends Renderable<infer ComponentProps, infer ComponentChild>
    ? ComponentChild
    : T extends SFC<infer SFCProps, infer SFCChild>
    ? SFCChild
    : unknown[];
export type RenderableType =
    SFC |
    Renderable |
    keyof MetaFHTML |
    keyof MetaFSVG |
    string;
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
