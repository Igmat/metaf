import MetaF, { Component } from 'metaf-core';
import { Hand } from '../Hand';
import { Plan } from '../Plan';
import './style.less';

export class Player extends Component() {
    private plans: Plan[] = new Array(3).fill(0).map(() => new Plan());
    private hand = new Hand();
    render() {
        return [
            <div onClick={() => console.log('clicked')}>
                {this.plans.map(plan => <plan.render />)}
            </div>,
            <this.hand.render />,
        ];
    }
}
