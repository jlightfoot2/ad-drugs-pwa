import * as React from "react";
import { Link } from 'react-router';
export interface HelloProps { 

}

export interface HelloState { 

}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export default class Hello extends React.Component<HelloProps, HelloState> {
    render() {
        return (<div>
                  <h1>Hello World Blah Blah!!!</h1>
                  <Link to="test">Test asdf</Link>
                  </div>
                  );
    }
}