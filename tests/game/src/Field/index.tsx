import MetaF, { Component } from 'metaf-core';
import { Row } from '../Row';
import './style.less';

export class Field extends Component() {
    private rows: Row[];
    constructor() {
        super();
        this.rows = new Array(11).fill(0).map((value, index) => new Row((index % 2) + 10));
    }
    render() {
        return this.rows.map(row => <row.render />);
    }
}
