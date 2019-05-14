import { Component } from 'metaf-react';
import React from 'react';
import './App.css';

class MyService {
    i = 1;
    arr = [{
        a: 1,
    }];
    obj = {
        j: 2,
    };
    cs = new Promise<number>(resolve => resolve(1));
    async f() {
        return (await this.cs) * this.i;
    }
}

export default class App extends Component({ MyService }) {
    render() {
        const { MyService } = this.dependencies;

        return (
            <div>
                <h1>{MyService.i} ({MyService.obj.j}) {MyService.f().value}</h1>
                {MyService.arr.map(({a}, index) => <h2 key={index}>{a}</h2>)}
                <button onClick={() => MyService.i++}>increment</button>
                <button onClick={() => MyService.arr.push({ a: MyService.i})}>add</button>
                <button onClick={() => MyService.obj.j++}>increment2</button>
                <button onClick={() => MyService.obj = { j: 1 }}>reset obj</button>
                <button onClick={() => MyService.arr = []}>reset arr</button>
                <button onClick={() => MyService.arr[MyService.obj.j].a = MyService.i}>reset arr ent number</button>
                <button onClick={() => MyService.arr[MyService.obj.j] = { a: MyService.i}}>reset arr ent whole</button>
            </div>
        );
    }
}
