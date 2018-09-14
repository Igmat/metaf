import { IComponent } from '../Component';
import * as MetaF from './MetaF';

export function createElement(
    type: 'input',
    props?: MetaF.InputHTMLAttributes<HTMLInputElement> | null,
    ...children: MetaF.MetaFNode[]): MetaF.DetailedMetaFHTMLElement<MetaF.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export function createElement<P extends MetaF.HTMLAttributes<T>, T extends HTMLElement>(
    type: keyof MetaF.MetaFHTML,
    props?: P | null,
    ...children: MetaF.MetaFNode[]): MetaF.DetailedMetaFHTMLElement<P, T>;
export function createElement<P extends MetaF.SVGAttributes<T>, T extends SVGElement>(
    type: keyof MetaF.MetaFSVG,
    props?: P | null,
    ...children: MetaF.MetaFNode[]): MetaF.MetaFSVGElement;
export function createElement<P extends MetaF.DOMAttributes<T>, T extends Element>(
    type: string,
    props?: P | null,
    ...children: MetaF.MetaFNode[]): MetaF.DOMElement<P, T>;

// Custom components
export function createElement<P>(
    type: new() => IComponent<P>,
    props?: P | null,
    ...children: MetaF.MetaFNode[]): MetaF.ComponentElement<P>;
export function createElement<P>(
    type: MetaF.SFC<P>,
    props?: P | null,
    ...children: MetaF.MetaFNode[]): MetaF.SFCElement<P>;

export function createElement<P>(type: string | MetaF.SFC<P> | (new() => IComponent<P>), props?: P | null, ...children: MetaF.MetaFNode[]) {
    return '' as any as  MetaF.MetaFElement<P>;
}
