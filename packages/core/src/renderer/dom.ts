import { MetaFSVG, svgTags } from '../JSX/SVG';
import { MetaFChild, MetaFNode, Renderable } from '../JSX/types';
import { runInSync } from '../sync/runInSync';

declare global {
    interface ObjectConstructor {
        keys<T extends object>(o: T): Extract<keyof T, string>[];
    }
}

type AppClass = new () => Renderable<{}, []>;
export function renderToDOM(App: AppClass, node: HTMLElement) {
    runInSync(() => {
        const app = new App();
        renderElement(app.render({}), node);
    });
}

function renderElement(element: MetaFNode | MetaFChild | null, node: HTMLElement | SVGElement) {
    if (element === null) return;
    if (Array.isArray(element)) {
        element.forEach(elem => renderElement(elem, node));

        return;
    }
    if (typeof element === 'string' ||
        typeof element === 'number') {
        if (node instanceof HTMLElement) {
            node.innerText = element.toString();
        } else {
            node.textContent = element.toString();
        }

        return;
    }
    if (typeof element.type === 'function') {
        renderElement(
            element.type(element.props, ...element.children),
            node,
        );

        return;
    }
    if (typeof element.type === 'object') {
        renderElement(
            element.type.render(element.props, ...element.children),
            node,
        );

        return;
    }
    const domElement = (svgTags.indexOf(element.type as keyof MetaFSVG) !== -1)
        ? window.document.createElementNS('http://www.w3.org/2000/svg', element.type)
        : window.document.createElement(element.type);
    const { props, children } = element;
    if (isDictionary(props)) {
        Object.keys(props)
            .forEach(attrName =>
                (attrName || '').startsWith('on')
                    ? domElement.addEventListener(getEventName(attrName), ensureFn(props[attrName]))
                    : domElement.setAttribute(attrName, ensureString(props[attrName])));
    }
    node.appendChild(domElement);
    renderElement(children as MetaFNode, domElement);
}
function getEventName(value: string) {
    return value.slice(2).toLowerCase();
}
function isDictionary(value: unknown): value is ({ [index: string]: unknown }) {
    return typeof value === 'object' && value !== null;
}

function ensureFn(value: unknown) {
    if (typeof value !== 'function') throw new Error(`Expected 'function' but got '${typeof value}'`);

    // TODO: remove cast when Function type will be fixed
    return value as (...args: unknown[]) => unknown;
}
function ensureString(value: unknown) {
    const result = (typeof value === 'number' || typeof value === 'boolean')
        ? value.toString()
        : value;
    if (typeof result !== 'string') throw new Error(`Expected 'string' but got '${typeof value}'`);

    return result;
}
