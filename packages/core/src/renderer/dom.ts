import { autorun } from 'metaf-observable';
import { runInSync } from 'metaf-sync';
import { createElement } from '../JSX/createElement';
import { MetaFSVG, svgTags } from '../JSX/SVG';
import { MetaFChild, MetaFNode, Renderable } from '../JSX/types';

declare global {
    interface ObjectConstructor {
        keys<T extends object>(o: T): Extract<keyof T, string>[];
    }
}

interface IInstanceHolder {
    elements: (HTMLElement | SVGElement | Text)[];
}
type AppClass = new () => Renderable;
export function renderToDOM(App: AppClass, node: HTMLElement) {
    runInSync(() => {
        const app = new App();
        renderElement(createElement(app.render, {}), node, { elements: [] });
    });
}

function renderElement(element: MetaFNode | MetaFChild | null, node: HTMLElement | SVGElement, holder: IInstanceHolder): void {
    if (element === null) return;
    if (Array.isArray(element)) {
        element.forEach(elem => renderElement(elem, node, holder));

        return;
    }
    if (typeof element === 'string' ||
        typeof element === 'number') {
        const textElement = document.createTextNode(element.toString());
        node.appendChild(textElement);
        holder.elements.push(textElement);

        return;
    }
    if (typeof element.type === 'function') {
        const { type } = element;
        const fnHolder: IInstanceHolder = {
            elements: [],
        };

        autorun(
            () => renderElement(type(element.props, ...element.children), node, fnHolder),
            {
                clear() {
                    fnHolder.elements.forEach(elem => elem.remove());
                    fnHolder.elements = [];
                },
            },
        )();

        return;
    }
    if (typeof element.type === 'object') {
        const { type } = element;
        const fnHolder: IInstanceHolder = {
            elements: [],
        };

        autorun(
            () => renderElement(type.render(element.props, ...element.children), node, fnHolder),
            {
                clear() {
                    fnHolder.elements.forEach(elem => elem.remove());
                    fnHolder.elements = [];
                },
            },
        )();

        return;
    }
    const domElement = (svgTags.indexOf(element.type as keyof MetaFSVG) !== -1)
        ? window.document.createElementNS('http://www.w3.org/2000/svg', element.type)
        : window.document.createElement(element.type);
    const { props, children } = element;
    if (isDictionary(props)) {
        Object.keys(props)
            .map(attrName =>
                attrName.startsWith('on')
                    ? domElement.addEventListener(getEventName(attrName), ensureFn(props[attrName]))
                    : domElement.setAttribute(attrName, ensureString(props[attrName])));
    }
    renderElement(children as MetaFNode, domElement, holder);

    node.appendChild(domElement);

    holder.elements.push(domElement);
}

function getEventName(value: string) {
    return value.slice(2).toLowerCase();
}
function isDictionary(value: unknown): value is ({ [index: string]: unknown }) {
    return typeof value === 'object' && value !== null;
}

function ensureFn(value: unknown) {
    if (typeof value !== 'function') throw new Error(`Expected "function" but got "${typeof value}"`);

    // TODO: remove cast when Function type will be fixed
    return value as (...args: unknown[]) => unknown;
}
function ensureString(value: unknown) {
    const result = (typeof value === 'number' || typeof value === 'boolean')
        ? value.toString()
        : value;
    if (typeof result !== 'string') throw new Error(`Expected "string" but got "${typeof value}"`);

    return result;
}
