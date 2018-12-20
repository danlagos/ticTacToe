import React, {Component} from 'react';

class Board extends Component {
  render() {

    return (
        <div className = "boxClass" onClick={this.props.clickFun} id = {this.props.id} >
          <h1> {this.props.playerInfo} </h1>
        </div>
    );
  }
}

export default Board;
