import { MetaFSVG, svgTags } from '../JSX/SVG';
import { MetaFChild, MetaFNode, Renderable } from '../JSX/types';
import { runInSync } from '../sync/runInSync';

declare global {
    interface ObjectConstructor {
        keys<T extends object>(o: T): (keyof T)[];
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
    if (typeof props === 'object' && props !== null) {
        Object.keys(props)
            .forEach(attrName =>
                domElement.setAttribute(attrName, props[attrName]));
    }
    node.appendChild(domElement);
    renderElement(children as MetaFNode, domElement);
}
