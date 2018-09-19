// tslint:disable
import { ResolvableComponent, MockRoot, dependency, requirement } from 'metaf-react';
import React, { Component } from 'react';
import './App.css';

// import logo from './logo.svg';
class MyService {
    public somedata = 'Hello from Metaf';
    public i = 0;
    public getI() {
        console.log(this.somedata)
        return this.i;
    }
}
const Item = ({ item }: any) => (item > 10 && item < 15)
    ? <div>Component<MyComponent /></div>
    : <div>{item}</div>

const getItem = () => Item;
function simpleHoc(app: any) {
    return <div style={{ fontWeight: 'bold' }}>{app}</div>
}
class MyComponent extends ResolvableComponent({ MyService, Item: getItem }, simpleHoc) {
    public state = {
        i: this.dependencies.MyService.getI(),
    }
    timer: any;
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <div>
                <Child item={this.state.i} />
                <this.dependencies.Item item={30} />
            </div>
        );
    }

    componentDidMount() {
        //this.timer = setTimeout(() => this.setState({ i: 11 }), 10000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
}
class Child extends Component<{ item: number }> {
    render() {
        return <Item item={this.props.item} />
    }
}

class App extends React.Component {
    public render() {
        return (
            <div>
                <MockRoot>
                    <MockRoot
                        dependencies={[
                            dependency(MyService, { somedata: 'hello from mock', i: 1, getI: () => 3 })
                        ]}
                        requirements={[
                            requirement(simpleHoc, (app: any) => <div style={{ color: 'green' }}>{app}</div>)
                        ]}
                    >
                        <MyComponent />
                    </MockRoot>
                    <MyComponent />
                    <MockRoot
                        dependencies={[
                            dependency(MyService, { somedata: 'hello from mock', i: 1, getI: () => 3 })
                        ]}
                        requirements={[
                            requirement(simpleHoc, (app: any) => <div style={{ color: 'red' }}>{app}</div>)
                        ]}
                    >
                        <MyComponent />
                    </MockRoot>
                </MockRoot>
            </div>
        );
    }
}

export default App;
