import MetaF, { Component } from 'metaf-core';

class Service {

}
interface ISomeComponentProps {
    name: string;
}
export class SomeComponent extends Component({ Service })<ISomeComponentProps> {
    constructor() {
        super(() => <div>{name}</div>);
    }

    onclick() {
        this.dependencies.Service;
    }
}

const q = <SomeComponent />;

// createContext();

// import { SomeComponent } from 'some-component-package';

// <SomeComponent />;

// //
// import { injectionRoot } from 'injection';

// injectionRoot.set(Service);
