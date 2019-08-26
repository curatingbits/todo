import React, { Component} from 'react';

class Counter extends Component {
  state = {
    count: 0,
    imageUrl: "https://picsum.photos/200"
  };

  styles = {
    fontSize: 1,
    fontWeight: "bold"
  }

  render(){

    let classes = "badge m2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";

    return (
      <div>

      <badge className={classes}>
      {this.formatCount()}
      </badge>

      <button className="btn btn-secondary btn-small">Increment</button>
      </div>

    )
  }

  formatCount () {
    return this.state.count === 0 ? 'Zero' : this.state.count;
  }

}



export default Counter;
