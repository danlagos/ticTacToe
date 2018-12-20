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
        // used to determine board size.
        boardSize: 3,
        // will make the board.  Based on boardsize^2
        boardArr: [],
        // arranges the board into a square
        boardColumn:[],
        // will contain the winning combinations.
        winComboArr:[],
        // hold the number of turns.  Used to determine turn, setting grid value, ect.
        clickCount: 0,
    // based on board size, limit to how many turns can be played
        clickCountLimit:0,

        winStatus:"",
        playerInfoArr:[],
        player1:"❌",
        player2:"⭕"
      }
  }

componentDidMount() {
  // console.log(this.state);
  let {boardSize, boardArr, boardColumn, winComboArr, clickCount, clickCountLimit, playerInfoArr} = this.state

  clickCountLimit = boardSize**2
  boardArr = Array(boardSize**2).fill(0)
  // console.log(boardArr);
  playerInfoArr = Array(boardSize**2).fill("")
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

  this.setState({boardArr: boardArr, boardColumn: boardColumn, winComboArr:winComboArr, clickCount:clickCount, clickCountLimit:clickCountLimit, playerInfoArr:playerInfoArr })

}

reSizeBoard=()=> {
  // console.log(this.state);
  let {boardSize, boardArr, boardColumn, winComboArr, clickCount, clickCountLimit, playerInfoArr} = this.state

  boardSize = parseInt(document.getElementById("width").value)

  clickCountLimit = boardSize**2
  boardArr = Array(boardSize**2).fill(0)
  // console.log(boardArr);
  playerInfoArr = Array(boardSize**2).fill("")
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

  this.setState({boardArr: boardArr, boardColumn: boardColumn, winComboArr:winComboArr, clickCount:clickCount, clickCountLimit:clickCountLimit, playerInfoArr:playerInfoArr, boardSize:boardSize })

}


restButton = () => {

  let {boardArr, clickCount, playerInfoArr, winStatus, boardSize, boardColumn} = this.state

  boardArr = Array(boardSize**2).fill(0)
    boardColumn = Array(boardSize).fill('100px')
  clickCount = 0

  playerInfoArr = Array(boardSize**2).fill("")

  winStatus = ""

  this.setState({boardArr: boardArr, clickCount:clickCount, playerInfoArr:playerInfoArr, winStatus:winStatus, boardSize:boardSize, boardColumn:boardColumn })

}

clickFun = e => {
    let clickedIdent = e.target.id
    let {boardSize, boardArr, boardColumn, winComboArr, clickCount, clickCountLimit, winStatus, playerInfoArr, player1, player2} = this.state
    let matchCount = 0;
    console.log("winComboArr", winComboArr);
    console.log("clickCount", clickCount);
    if ((boardArr[clickedIdent] === 0 && (clickCount<(boardSize**2 )&& winStatus==""))) {
      if (clickCount % 2 === 0) {
        boardArr[clickedIdent] = 1
        playerInfoArr[clickedIdent]=player1
        for(let i=0; i<(boardSize*2+2);i++){
          for(let j=0; j<boardSize;j++){
            if(boardArr[winComboArr[i][j]]===1){
              matchCount++
            }
          }
          if(matchCount===boardSize){
            winStatus = "Player 1 Wins";
            // clickCount = boardSize**2
            break
          }
          matchCount=0;
        }
      } else {
        boardArr[clickedIdent] = 2
        playerInfoArr[clickedIdent]=player2
        for(let i=0; i<(boardSize*2+2);i++){
          for(let j=0; j<boardSize;j++){
            if(boardArr[winComboArr[i][j]]===2){
              matchCount++
            }
          }
          if(matchCount===boardSize){
            winStatus = "Player 2 Wins";
            // clickCount = boardSize**2
            break
          }
          matchCount=0;
        }
      }
      clickCount ++
      if (clickCount === boardSize**2) {
        winStatus = "Draw"
      }
      console.log("clickCount after player", clickCount);
     }

     console.log("boardArr",boardArr);

  this.setState({boardArr: boardArr, boardColumn: boardColumn, winComboArr:winComboArr, clickCount:clickCount, clickCountLimit:clickCountLimit, winStatus:winStatus, playerInfoArr:playerInfoArr})
  console.log("winStatus",winStatus);

}

  render() {
    let grids = this.state.boardArr.map((v, i) =>{
      return(
        <Board id = {i} clickFun={this.clickFun} boardValue = {this.state.boardArr[i]} playerInfo={this.state.playerInfoArr[i]}/>

      )
    })
    let gridStyle = {
      display: 'grid',
      margin: 'auto',
      justifyContent: 'center',
      // backgroundColor: 'green',
      gridTemplateColumns: this.state.boardColumn.join(' ')
    }
    // console.log(this.state);
    return (
      <div>
        <Header changeBoard = {this.reSizeBoard}/>
        <div style = {gridStyle}>
        {grids}
        </div>
        <GameInfo winner = {this.state.winStatus} restButton={this.restButton}/>
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
