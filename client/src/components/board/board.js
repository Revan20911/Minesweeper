import React from 'react';
import Cell from '../cell/cell';

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

     generateMines(board){

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


     initBoardSetting(height, width, mines){
        let temp = [];

        for(let i = 0; i < height; i++){
            temp.push([]);
            for(let j = 0; j < width; j++){
                temp[i][j] = {

                    x: i,
                    y: j,
                    isMine: false,
                    neigbour: 0,
                    isOpen: false,

                }
            }
        }

        return temp;
     }
}