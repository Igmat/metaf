import MetaF, { Component } from 'metaf-core';
import { Card } from '../Card';
import './style.less';

export class Hand extends Component() {
    private cards: Card[] = new Array(10).fill(0).map(() => new Card());
    render() {
        return this.cards.map(card => <card.render />);
    }
}
