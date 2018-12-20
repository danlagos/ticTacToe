import React, { Component } from 'react';
import './App.css';
import Board from './Board.js'
import GameInfo from './GameInfo.js'
import Header from './Header.js'

class App extends Component {
  // BOARD COMPONENT:  initial data - start state of board.  (meaning begining status is zero)
  // need board size and empty board array
  // inital data = number player (two players), generate collumn information
  constructor(props){
    super(props)
      this.state = {
        boardSize: 3,
        boardArr: [],
        boardColumn:[],
        winComboArr:[],
        clickCount: 0
      }
  }

componentDidMount() {
  // console.log(this.state);
  let {boardSize, boardArr, boardColumn, winComboArr, clickCount} = this.state

  clickCount = boardSize**2
  boardArr = Array(boardSize**2).fill(0)
  // console.log(boardArr);
  boardColumn = Array(boardSize).fill('100px')
  // console.log(boardColumn);
  let tempArr = boardArr.map((v,i)=>i)

    for (let i = 0; i < boardSize; i++) {
      winComboArr.push(tempArr.slice(i*boardSize, (i+1)*boardSize))
    }
    // console.log('temp', tempArr);
    for (let i = 0; i < boardSize; i++){
      let tempTwoArr = tempArr.filter(v=>v % boardSize === i)
      winComboArr.push(tempTwoArr)
    }
      let tempThreeArr = tempArr.filter(v=>(v% (boardSize+1)) === 0)
      winComboArr.push(tempThreeArr)

      let tempLastArr = tempArr.filter(v=>((v% (boardSize-1)) === 0)&&(v!==0)&&(v!==(boardSize**2-1)))
      winComboArr.push(tempLastArr)

// console.log("second win", winComboArr);

  this.setState({boardArr: boardArr, boardColumn: boardColumn, winComboArr:winComboArr, clickCount:clickCount })

}


  render() {
    console.log('win arr render', this.state);
    let grids = this.state.boardArr.map(v =>{
      return(
        <Board />
      )
    })
    let gridStyle = {
      display: 'grid',
      margin: "0",
      gridTemplateColumns: this.state.boardColumn.join(' ')
    }
    // console.log(this.state);
    return (
      <div>
        <Header />
        <div style = {gridStyle}>
        {grids}
        </div>
        <GameInfo />
      </div>
    );
  }
}

export default App;
// app contains three components
// app checks for win conditions in board.
// header component that shows title
//  board component where each player inputs
// gaming info compoment where each player is assigned, and displays win/lose/draw status
  // BOARD COMPONENT:  initial data - start state of board.  (meaning begining status is zero)
  // need board size and empty board array
  // inital data = number player (two players), genearte collumn information
  // 0 = not clicked
  // 1 = player 1 clicked
  // 2 = player 2 clicked
  // generate board array.  based on boardsize squared
  // generate winning combination array
  // display board in Apps, using grid method to generate square made of grids.  based on number of collumn information
  // if 0 and valid click count less than boardsize squared, than player 1 can click to assign value
  // if click count % 2 === 0 than player 1 turn
  // else player 2's turn
  //  check array status with winning combination
  // if winning combination, game stops, and declare winner.
  // if not than start again.(need loop)
  // if count reaches boardsize squared, than declare draw
  // send this information to gaming info component
  //  game ends, declare win/los/draw status
  // reset button to start game.  When clicked initalize board data
