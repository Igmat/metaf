import { IOverrideResult } from 'metaf-resolvable';
import { Component } from 'react';
import { HOC, IRequirementsOverride, resolver } from './Resolver';

/**
 * @description ApplicationRoot props
 */
export interface IApplicationRootProps {

    /**
     * Entities of this array meant to be built with `dependency` helper
     * @description array of overrides for `dependencies`
     */
    dependencies: IOverrideResult[];

    /**
     * Entities of this array meant to be built with `requirement` helper
     * @description array of overrides for `requirements`
     */
    requirements: IRequirementsOverride[];
}

interface IApplicationRootState {
    hocs: HOC[];
}
/**
 * @internal
 */
export const config = {
    shouldThrowForSeveralRoots: true,
};
let applicationRootWasAdded = false;

/**
 * Component that is used for declaring overrides for `dependencies` and `requirements`.
 * Also `requirements` HOCs applied to `render` method of this component in order to
 * wrap you application tree for providing proper environment for your `ResolvableComponent`s
 * @description ApplicationRoot Component
 * > **NOTE:** `<ApplicationRoot>` is meant to appear only once in your app
 * and in majority of cases it should be the first and only wrapper around
 * your `App` component. Adding other `ApplicationRoot`s somewhere in your app
 * won't affect dependency resolution mechanism but instead will throw an error
 */
export class ApplicationRoot extends Component<IApplicationRootProps, IApplicationRootState> {

    /**
     * by default there are no predefined `dependencies` or `requirements`
     * @description default props of `ApplicationRoot` component
     */
    static defaultProps = {
        dependencies: [],
        requirements: [],
    };
    /**
     * @internal
     */
    protected resolver = resolver;

    /**
     * Creates an instance of application root.
     * @param props contains overrides for `dependencies` and `requirements`
     */
    constructor(props: Readonly<IApplicationRootProps>) {
        super(props);
        if (config.shouldThrowForSeveralRoots && applicationRootWasAdded) {
            throw new Error("It's restricted to add more than one <ApplicationRoot>");
        } else {
            applicationRootWasAdded = true;
        }
        this.resolver.setOverrides(props.dependencies);
        this.resolver.setRequirementsOverrides(props.requirements);
        const hocs = this.resolver.subscribeForRequirements(this.requirementsUpdate);
        this.state = { hocs };
    }

    render() {
        return this.wrapInHocs();
    }

    /**
     * @internal
     */
    protected wrapInHocs = () => {
        const { children } = this.props;
        const { hocs } = this.state;

        return hocs.reduce((result, hoc) => hoc(result), children);
    };

    /**
     * @internal
     */
    private requirementsUpdate = (requirements: HOC[]) => {
        this.setState({ hocs: requirements });
    }
}
