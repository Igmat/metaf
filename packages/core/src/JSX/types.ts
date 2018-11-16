import MetaFHTML from './HTML';
import { MetaFSVG } from './SVG';

//
// Component API
// ----------------------------------------------------------------------
export type SFC<P = {}, C extends unknown[] = unknown[]> = (props: P, ...children: C) => MetaFNode | MetaFChild | null;
export interface Renderable<P, C extends unknown[]> {
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
    : T extends Renderable<infer ComponentProps, unknown[]>
    ? ComponentProps
    : T extends SFC<infer SFCProps, unknown[]>
    ? SFCProps
    : never;
export type InferChild<T extends RenderableType> =
    T extends keyof MetaFHTML | MetaFSVG
    ? MetaFNode
    : T extends Renderable<unknown, infer ComponentChild>
    ? ComponentChild
    : T extends SFC<unknown, infer SFCChild>
    ? SFCChild
    : never;
export type RenderableType<P = unknown, C extends unknown[] = unknown[]> = SFC<P, C> | Renderable<P, C> | keyof MetaFHTML | keyof MetaFSVG;
export interface MetaFElement<T extends RenderableType = RenderableType> {
    type: T;
    props: InferProps<T>;
    children: InferChild<T>;
}
//
// MetaF Nodes
// ----------------------------------------------------------------------
export type MetaFText = string | number;
export type MetaFChild = MetaFElement | MetaFText;
export type MetaFNode = MetaFChild[];
