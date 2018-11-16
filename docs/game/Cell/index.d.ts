import { Component } from 'metaf-core';
import './style.less';
declare class SomeService {
    fn(): Promise<number>;
}
declare const Cell_base: Component<{
    SomeService: typeof SomeService;
}>;
export declare class Cell extends Cell_base {
    private content;
    constructor(content: string);
    render(): any;
}
export {};
