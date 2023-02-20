import React from 'react';
import Cell from '../cell/cell';
import "../../App.css";

export default class Board extends React.Component{
    state ={

        boardSettings: this.initBoardSettings(
            this.props.height,
            this.props.width,
            this.props.mines
        ),
        gameOver: false,

        mineCount: this.props.mines,
     }
    
    checkVictory(){

        let count = 0;
        let mines = this.state.mineList
        let board = this.state.boardSettings

        mines.forEach((mine) => {

            for(let i = 0; i < 10; i++){
                for(let j = 0; j < 10; j++){
                    if(board[i][j].x == mine[0] && board[i][j].y == mine[1]){
                        if(board[i][j].isFlagged == true){
                            count++;
                        }
                    }
                }
            }
            
        })


        if(count === 10){

            return true;

        }

     }

     getNeighbours(x, y){

        let nArray = []

        if (x > 0) {
            nArray.push([x - 1, y]);
        }
        
        if (x < 9) {
            nArray.push([x + 1, y]);
        }
       
        if (y > 0) {
            nArray.push([x, y - 1]);
        }
        
        if (y < 9) {
            nArray.push([x, y + 1]);
        }
       
        if (x > 0 && y > 0) {
            nArray.push([x - 1, y - 1]);
        }
        
        if (x > 0 && y < 9) {
            nArray.push([x - 1, y + 1]);
        }
        
        if (x < 9 && y < 9) {
            nArray.push([x + 1, y + 1]);
        }
        
        if (x < 9 && y > 0) {
            nArray.push([x + 1, y - 1]);
        }
        
        return  nArray;

     }
    
    handleRightClick(x,y, e){
        e.preventDefault();

        let updatedBoard = this.state.boardSettings;

        updatedBoard[x][y].isFlagged = true;
        updatedBoard[x][y].isOpen = true;

        this.setState({boardSettings: updatedBoard});

     }

     handleLeftClick(x,y){

        
        let updatedBoard = this.state.boardSettings;

        updatedBoard[x][y].isOpen = true;

        console.log(updatedBoard[x][y].neighbours);

        updatedBoard[x][y].neighbours.forEach((n) => {
            let nx = n[0 ];
            let ny = n[1];

            if(updatedBoard[nx][ny].isMine == false && updatedBoard[nx][ny].isOne == false ){

                updatedBoard[nx][ny].isOpen = true;

            }

            if(updatedBoard[nx][ny].isMine == true){

                if(updatedBoard[nx + 1][ny] && updatedBoard[nx][ny+1]){

                    updatedBoard[nx + 1][ny].isOne = true;
                    updatedBoard[nx][ny+1].isOne = true;

                }

            }
        })

        if(updatedBoard[x][y].isMine == true){

            updatedBoard.gameOver = true;
            
        }
        
        this.setState({ boardSettings: updatedBoard});
        
     }


     renderBoard(board){

        return board.map((boardrow) => {
            return boardrow.map((cell, index) => {
                return(
                <div key={index}>
                    <Cell 
                    onClick={() => this.handleLeftClick(cell.x, cell.y)}
                    onContextMenu={e => this.handleRightClick(cell.x, cell.y, e)}
                    value={cell}
                    />
                </div>)
            } )
        })

     }
     
      generateMines(){

        let mineMap = [];

        for(let i = 0; i < 10; i++){

            let xcoord = Math.floor(Math.random() * 10);
            let ycoord = Math.floor(Math.random() * 10);
    
            mineMap.push([xcoord, ycoord]);
         
        }

        return mineMap;
     }

initBoardSettings(height, width){
     let temp = [];

        let mineMap = this.generateMines();

        for(let i = 0; i < height; i++){
            temp.push([]);
            for(let j = 0; j < width; j++){

                let mineValue = false;

                let neighbours = this.getNeighbours(i,j);
                
                mineMap.forEach((mine) => {

                    if(mine[0] === i && mine[1] === j){
                        
                        mineValue = true;
                    }
                })

                temp[i][j]= {

                    x: i,
                    y: j,
                    isMine: mineValue,
                    neighbours: neighbours,
                    isOpen: false,
                    isOne: false,
                    isTwo: false,

                }

            }
        }

       return temp;
     }
     
     gameOver(){

        if(this.state.gameOver === true) 
        <div>
            <h1>Game Over</h1>
            <button onClick={this.resetGame}>Retry?</button>
        </div> 
        
        if(this.state.victory === true){

            return <div>
            <h1>You Win!</h1>
            <button onClick={this.resetGame}>Retry?</button>
        </div> 
        }

        if(this.state.victory === false && this.state.gameOver === false)

        return <h1>Minesweeper</h1>

     }

     render(){

        return(
            <div className='board'>
                {this.renderBoard(this.state.boardSettings)}
            </div>
        )
     }
}
