import { InferChild, InferProps, MetaFElement, RenderableType } from './types';
export function createElement<T extends RenderableType>(
    type: T,
    props: InferProps<T>,
    ...children: InferChild<T>): MetaFElement<T> {
    return {
        type,
        props,
        children,
    };
}
