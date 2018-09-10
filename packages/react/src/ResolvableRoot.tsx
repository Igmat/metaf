// import { Constructable, IDependencies, IInjections, Resolver, setResolverFn } from 'metaf-resolvable';
// import React, { createContext } from 'react';

// const defaultResolver = new Resolver();
// const { Provider, Consumer } = createContext(defaultResolver.resolveFor);
// function resolveFromContext<I extends IInjections = {}>(
//     instance: object,
//     classImpl: Constructable,
//     injections: I,
//     args: any[]) {
//     const instancePrototype = Object.getPrototypeOf(instance);
//     const originalRender = instancePrototype.render;
//     // tslint:disable-next-line:only-arrow-functions
//     instancePrototype.render = function () {
//         return (
//             <Consumer>
//                 {resolve => {
//                     // tslint:disable-next-line:no-invalid-this
//                     this.dependencies = resolve(instance, classImpl, injections, args);

//                     return originalRender();
//                 }}
//             </Consumer>
//         );
//     };
//     const result = {} as IDependencies<I>;
//     Object.keys(injections)
//         .forEach(injectionName => Object.defineProperty(result, injectionName, {
//             get() {
//                 throw new Error(`Dependency '${injectionName}' for ${instancePrototype.name} isn't resolved yet`);
//             },
//         }));

//     return result;
// }

// const resolvedFromContext = new WeakMap();
// function resolveFor<I extends IInjections = {}>(
//     instance: object,
//     classImpl: Constructable,
//     injections: I = {} as I,
//     args: any[] = [],
// ): IDependencies<I> {
//     if (!resolvedFromContext.has(classImpl)) {
//         resolvedFromContext.set(classImpl, resolveFromContext(instance, classImpl, injections, args));
//     }

//     return resolvedFromContext.get(classImpl);
// }
// setResolverFn(resolveFor);

// export {
//     Provider,
// };
