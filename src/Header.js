import React, {Component} from 'react';

class Header extends Component {
  resize=(e) =>{
    e.preventDefault();
    this.props.changeBoard()
  }
  selectIcon=(e) => {
    e.preventDefault();
    this.props.selectIcon()
  }

  render() {

    return (
      <div className= "headerClass">
        <h1> Tic Tac Toe </h1>
        <div>
          <form onSubmit={this.resize}>
              Board Size : <input type="number" id="width" min="3" max="10" required/>
              <input type="submit" value="Submit" />
          </form>

        </div>
        Player 1 : {this.props.player1}, Player 2: {this.props.player2}
        <br />
        <div>
        <form onSubmit={this.selectIcon}>
          <input type="radio" name="icon" value="❌" checked/> ❌
          <input type="radio" name="icon" value="⭕"/> ⭕<br/><br/>
          <input type="submit" />
        </form>
        </div>

      </div>
    );
  }
}

export default Header;
