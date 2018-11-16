import MetaF, { Component } from 'metaf-core';
import './style.less';

class SomeService {
    async fn() {
        return 1;
    }
}
export class Cell extends Component({ SomeService }) {
    constructor(private content: string) {
        super();
        console.log(this.dependencies.SomeService.fn().value, this.content);
    }
    render() {
        return (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="50"
                viewbox="0 0 43.30127018922193 50"
                style="filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 10px);"
            >
                <path
                    stroke="#000"
                    fill="#fff"
                    d="M21.650635094610966 0L43.30127018922193 12.5L43.30127018922193 37.5L21.650635094610966 50L0 37.5L0 12.5Z"
                />
            </svg>
        );
    }
}
