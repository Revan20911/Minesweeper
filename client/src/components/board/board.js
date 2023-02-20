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

     getMines(board){

        let mineArray = [];
        board.map(boardrow => {
            boardrow.map((cell) => {

                if(cell.isMine){
                    mineArray.push(cell);
                }
                return;
            })
            return;
        })
     }

     getNeighbours(board, height, width){

        let updatedBoard = board;

        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; i++){
                if(board[i][j].isMine !== true){
                    let mine = 0;

                    const area = this.searchBoard(
                        board[i][j].x, 
                        board[i][j].y, 
                        board
                    )
                }
            }
        }

     }

     searchBoard(x, y, board){

        const coord = [];

        if(x > 0){
            coord.push(board[x-1][y]);
        }

        if(x > 0){
            coord.push(board[x-1][y]);
        }
        if(x > 0){
            coord.push(board[x-1][y]);
        }
        if(x > 0){
            coord.push(board[x-1][y]);
        }
        if(x > 0){
            coord.push(board[x-1][y]);
        }
        if(x > 0){
            coord.push(board[x-1][y]);
        }

        return coord;

     }


     renderBoard(board){

        return board.map((boardrow) => {
            return boardrow.map((cell, index) => {
                return(
                <div key={index}>
                    <Cell 
                    
                    value={cell}
                    />
                </div>)
            } )
        })

     }


     initBoardSettings(height, width, mines){
        let temp = [];

        for(let i = 0; i < height; i++){
            temp.push([]);
            for(let j = 0; j < width; j++){
                temp[i][j] = {

                    x: i,
                    y: j,
                    isMine: false,
                    neighbour: 0,
                    isOpen: false,

                }
            }
        }

        return temp;
     }

     render(){

        return(
            <div className='board'>
                {this.renderBoard(this.state.boardSettings)}
            </div>
        )
     }
}