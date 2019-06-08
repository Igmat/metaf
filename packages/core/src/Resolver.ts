import { observe } from 'metaf-observable';
import { Injectable, Resolver, setResolverFn } from 'metaf-resolvable';
import { synchronous } from 'metaf-sync';
class MetafResolver extends Resolver {
    initialize(obj: Injectable) {
        const result = super.initialize(obj);

        return (typeof result === 'object' && result !== null)
            ? synchronous(observe(result))
            : result;
    }
}
const appResolver = new MetafResolver();
setResolverFn(
    appResolver.resolveFor.bind(appResolver),
    appResolver.resolveRequirements.bind(appResolver),
);
