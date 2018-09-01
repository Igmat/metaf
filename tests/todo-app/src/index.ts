import { Component, runInSync, State, sync } from 'metaf-core';

class Service {
    q = 1;
    pr = Promise.resolve(1);
    pr2 = Promise.resolve({ name: 'Ihor' });
    meth(s: any) { return 1; }
    async meth2(arg: object, arg2: string, wr3: object) {
        return JSON.stringify({ arg, arg2, wr3 });
    }
    async meth3() { return { obj: 1 }; }
}

export class MyState extends State({ Service }) {
    constructor() {
        super();
    }
    someMethod2() {
        return this.dependencies.Service.meth('');
    }
    someMethod() {
        return this.dependencies.Service.meth3();
    }
    someOther() {
        return this.dependencies.Service.meth2({}, 'bla', {});
    }
}
export class FullState extends State({}) {
    statePart = new MyState();
    statePart2 = new MyState();
}
export class App extends Component({ Service }) {
    somePrivateProp = '';
    constructor() {
        super(() => this.somePrivateProp || '');
    }
}
const s = new App();
console.log(s.render.toString());

let i = 0;
async function test() {
    return new Promise<number>(resolve => setTimeout(() => resolve(i++), 1000));
}
const promiseArray = [
    test(),
    test().then(test),
    test().then(test).then(test),
    test().then(test).then(test).then(test),
    test().then(test).then(test).then(test).then(test),
];
// const pr = Promise.all(promiseArray);
let numberOfRuns = 0;
function application() {
    console.log();
    console.log(++numberOfRuns);
    const values = promiseArray.map(sync);
    const vv = new FullState();
    console.log(vv);
    console.log(vv.statePart2.someMethod2());
    console.log(vv.statePart.someOther());
    console.log(vv.statePart2.someMethod());
    // const values = sync(pr);
    console.log(typeof values[0]);
    console.log('check correctness', values[0] === values[1]);
    console.log(values.map(value => value));
}
// function application() {
//     console.log(++numberOfRuns);
// }
runInSync(application);
