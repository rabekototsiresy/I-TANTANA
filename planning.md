import React, { Component } from 'react'

import Fullscreen from "react-full-screen";
import Header from '../Header';


const style ={
  background: "#000"
}

class ChangeMdp extends Component {
  constructor(props) {
    super();

    this.state = {
      isFull: false,
    };
  }

  goFull = () => {
    this.setState({ isFull: true });
  }

  componentDidMount() {
    this.goFull()
    console.log('compnent did mount')
  }
  
  render() {
    return (
      <div className="App">
    
      <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
        <Header />
          <div className="full-screenable-node">
            Hi! This may cover the entire monitor.
          </div>
        </Fullscreen>
      </div>
    );
  }
}

export default ChangeMdp;
