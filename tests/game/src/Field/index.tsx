import MetaF, { Component } from 'metaf-core';
import './style.less';

const hexSide = 30;
const hexSize = {
    height: hexSide * 2,
    width: hexSide * Math.sqrt(3),
};
const hexPoints = [
    `M0 ${hexSide / 2}`,
    `v${hexSide}`,
    `l${hexSize.width / 2} ${hexSide / 2}`,
    `l${hexSize.width / 2} ${-hexSide / 2}`,
    `v${-hexSide}`,
    `l${-hexSize.width / 2} ${-hexSide / 2}`,
    'Z',
];
const hexPath = hexPoints.join(' ');
const getHorizontalOffset = (x: number, y: number) =>
    (x + ((y + 1) % 2) * 0.5) * hexSize.width;
const getVerticalOffset = (y: number) =>
    y * (hexSize.height - hexSide / 2);

function Cell({ x = 0, y = 0, handler = (x = 0, y = 0) => { } }) {
    return (
        <svg
            x={getHorizontalOffset(x, y)}
            y={getVerticalOffset(y)}
            onClick={() => handler(x, y)}
        >
            <path
                stroke="#000"
                fill="#fff"
                d={hexPath}
            />
        </svg>
    );
}
function Row({ length = 0, rowNumber = 0, handler = (x = 0, y = 0) => { } }) {
    return new Array(length)
        .fill(0)
        .map((val, index) =>
            <Cell x={index} y={rowNumber} handler={handler} />);
}

export class Field extends Component() {
    private rows: number[];
    private get Rows() {
        return this.rows.map((row, index) =>
            <Row length={row} rowNumber={index} handler={this.onCellClick} />);
    }
    constructor() {
        super();
        this.rows = new Array(5).fill(0).map((value, index) => (index % 2) + 10);
    }
    onCellClick = (x = 0, y = 0) => {
        this.rows = new Array(y + 1).fill(0).map((value, index) => (index % 2) + x + 1);
    }
    render() {
        return (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="600"
                height="300"
                viewbox="0 0 600 300"
            >
                {this.Rows}
            </svg>
        );
    }
}
