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

const Cell = ({ x = 0, y = 0 }) =>
    (
        <svg
            x={getHorizontalOffset(x, y)}
            y={getVerticalOffset(y)}
            onClick={() => console.log(x, y)}
        >
            <path
                stroke="#000"
                fill="#fff"
                d={hexPath}
            />
        </svg>
    );
const Row = ({ length = 0, rowNumber = 0 }) =>
    new Array(length).fill(0).map((val, index) => <Cell x={index} y={rowNumber} />);

export class Field extends Component() {
    private rows: number[];
    constructor() {
        super();
        this.rows = new Array(5).fill(0).map((value, index) => (index % 2) + 10);
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
                {this.rows.map((row, index) => <Row length={row} rowNumber={index} />)}
            </svg>
        );
    }
}
