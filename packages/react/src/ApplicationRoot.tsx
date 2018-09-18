import { IOverrideResult } from 'metaf-resolvable';
import { Component } from 'react';
import { HOC, IRequirementsOverride, resolver } from './Resolver';

/**
 * // TODO: comment IApplicationRootProps
 * @description application root props
 */
export interface IApplicationRootProps {

    /**
     * // TODO: comment dependencies
     * @description
     */
    dependencies: IOverrideResult[];

    /**
     * // TODO: comment requirements
     * @description
     */
    requirements: IRequirementsOverride[];
}

interface IApplicationRootState {
    hocs: HOC[];
}

/**
 * // TODO: comment ApplicationRoot
 * @description Application root
 */
export class ApplicationRoot extends Component<IApplicationRootProps, IApplicationRootState> {

    /**
     * // TODO: comment defaultProps
     * @description Default props of application root
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
     * @param props
     */
    constructor(props: Readonly<IApplicationRootProps>) {
        super(props);
        this.resolver.setOverrides(props.dependencies);
        this.resolver.setRequirementsOverrides(props.requirements);
        this.resolver.subscribeForRequirements(this.requirementsUpdate);
    }

    /**
     * // TODO: comment render
     * @description Renders application root
     * @returns
     */
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
        if (this.state) {
            this.setState({ hocs: requirements });
        } else {
            this.state = { hocs: requirements };
        }
    }
}
