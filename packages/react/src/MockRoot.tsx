import * as MetafResolvable from 'metaf-resolvable';
import React, { ReactNode } from 'react';
import { ApplicationRoot, IApplicationRootProps } from './ApplicationRoot';
import { ReactResolver, resolver } from './Resolver';

interface IRenderWrapper {
    originalRender: Function;
    renders: WeakMap<MetafResolvable.ResolveForFunction, Function>;
}
const renderWrappers = new WeakMap<Function, IRenderWrapper>();
const resolveSymbol =
    'MetaF Resolver, actually it should be a Symbol, but corresponding issue is still open (https://github.com/facebook/react/issues/7552)';
const defaultResolver = new ReactResolver();

function addPropsToAll(children: ReactNode, resolve: MetafResolvable.ResolveForFunction) {
    function recursiveClone(child: React.ReactChild): React.ReactChild {
        if (!React.isValidElement<any>(child)) return child;
        const resultingProps = typeof child.type === 'string'
            ? {}
            : { [resolveSymbol]: resolve };
        let newChild = child;
        if (typeof child.type === 'function') {
            const renderFn = (child.type.prototype.render)
                ? child.type.prototype.render // we are in class component
                : child.type; // we are in single function component
            if (!renderWrappers.has(child.type)) {
                const renderWrapper: IRenderWrapper = {
                    originalRender: renderFn,
                    renders: new WeakMap(),
                };

                const renderReplacement = function (this: any, ...args: any[]) {
                    const props = (this === undefined)
                        ? args[0] // we are in single function component, so props are in args
                        : this.props; // we are in component, so props are in this
                    const { [resolveSymbol]: particularResolver = defaultResolver.resolveFor } = props;
                    const render = renderWrapper.renders.get(particularResolver) || renderWrapper.originalRender.bind(this);

                    return render(this, ...args);
                };
                if (child.type.prototype.render) child.type.prototype.render = renderReplacement;
                else newChild = { ...child, type: renderReplacement };
                renderWrappers.set((newChild as any).type, renderWrapper);
            }
            // Next statement isn't undefined, because if there were no element for this key
            // previous block of code makes its initial setup, so when we reach this point its already there
            // tslint:disable-next-line:no-non-null-assertion
            const { originalRender, renders } = renderWrappers.get((newChild as any).type)!;
            if (!renders.get(resolve)) {
                renders.set(resolve, (thisArg: object, ...args: any[]) => addPropsToAll(originalRender.call(thisArg, ...args), resolve));
            }
        }

        return React.cloneElement(newChild, resultingProps, ...(React.Children.map(child.props.children, recursiveClone) || []));
    }

    return React.Children.map(children, recursiveClone);
}

function resolveFor<I extends MetafResolvable.IInjections = {}>(
    instance: object,
    classImpl: MetafResolvable.Constructable,
    injections: I = {} as I,
    args: any[] = [],
): MetafResolvable.IDependencies<I> {
    const [props] = args;
    const { [resolveSymbol]: resolve = defaultResolver.resolveFor } = props;

    return resolve(instance, classImpl, injections, args);
}

let isResolverFnChangedToMock = false;

/**
 * // TODO: comment MockRoot
 * @description Mock root
 */
export class MockRoot extends ApplicationRoot {

    /**
     * Creates an instance of mock root.
     * @param props
     */
    constructor(props: Readonly<IApplicationRootProps>) {
        super(props);
        if (!isResolverFnChangedToMock) {
            resolver.resolveFor = resolveFor;
            isResolverFnChangedToMock = true;
        }
        this.resolver = new ReactResolver(props.dependencies);
    }

    /**
     * // TODO: comment render
     * @description Renders mock root
     * @returns
     */
    render() {
        return addPropsToAll(this.wrapInHocs(), this.resolver.resolveFor);
    }
}
