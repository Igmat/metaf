import { IOverrideResult } from 'metaf-resolvable';
import { Component } from 'react';
import { HOC, IRequirementsOverride, resolver } from './Resolver';

export interface IApplicationRootProps {
    dependencies: IOverrideResult[];
    requirements: IRequirementsOverride[];
}

interface IApplicationRootState {
    hocs: HOC[];
}
export class ApplicationRoot extends Component<IApplicationRootProps, IApplicationRootState> {
    static defaultProps = {
        dependencies: [],
        requirements: [],
    };
    /**
     * @internal
     */
    protected resolver = resolver;
    constructor(props: Readonly<IApplicationRootProps>) {
        super(props);
        this.resolver.setOverrides(props.dependencies);
        this.resolver.setRequirementsOverrides(props.requirements);
        this.resolver.subscribeForRequirements(this.requirementsUpdate);
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
        if (this.state) {
            this.setState({ hocs: requirements });
        } else {
            this.state = { hocs: requirements };
        }
    }
}
