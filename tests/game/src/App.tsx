import MetaF, { Component } from 'metaf-core';
import './App.less';
import { Field } from './Field';
import { Opponent } from './Opponent';
import { Player } from './Player';

export class App extends Component({
    Field,
    Player,
    Opponent,
}) {
    render() {
        const {
            Field,
            Opponent,
            Player,
        } = this.dependencies;

        return [
            <Opponent.render />,
            <Field.render />,
            <Player.render />,
        ];
    }
}
