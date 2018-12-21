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
        <br />
        <div>
        <form onSubmit={this.selectIcon} id="icon">
          <input type="radio" name="icon" value="X" checked/> X
          <input type="radio" name="icon" value="O"/> O<br/><br/>
          <input type="submit" />
        </form>
        </div>

      </div>
    );
  }
}

export default Header;
