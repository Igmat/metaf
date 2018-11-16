import MetaF, { Component } from 'metaf-core';
import { Cell } from '../Cell';
import './style.less';

export class Row extends Component() {
    private cells: Cell[];
    constructor(length: number) {
        super();
        this.cells = new Array(length).fill(0).map((val, index) => new Cell(index.toString()));
    }
    render() {
        return this.cells.map(cell => <cell.render />);
    }
}
