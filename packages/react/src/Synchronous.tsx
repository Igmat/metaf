import { PromiseCache } from 'metaf-sync';
import React, { Component, ComponentType, ErrorInfo, Suspense } from 'react';
import { HOC } from './Resolver';

export interface ISynchronousState {
    isWaiting: boolean;
}
export interface ISynchronousProps {
    fallback: ComponentType;
}
export class Synchronous extends Component<ISynchronousProps, ISynchronousState> {
    static defaultProps = {
        fallback: () => <div />,
    };
    state = {
        isWaiting: false,
    };
    componentDidCatch(error: any, errorInfo: ErrorInfo) {
        if (!(error instanceof PromiseCache)) throw error;

        this.setState({ isWaiting: true });
        error.resolved
            .then(() => this.setState({ isWaiting: false }))
            .catch(innerError => { throw innerError; });
    }
    render() {
        const { isWaiting } = this.state;

        return isWaiting
            ? <this.props.fallback />
            :  this.props.children;
    }
}
// export const SynchronousHOC: HOC = app => <Synchronous>{app}</Synchronous>;
export const SynchronousHOC: HOC = app => <Suspense fallback={<div />}>{app}</Suspense>;
