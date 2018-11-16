import MetaF, { Component } from 'metaf-core';
import './App.less';
import { Field } from './Field';

export class App extends Component() {
    private field = new Field();
    render() {
        return <this.field.render />;
    }
}
