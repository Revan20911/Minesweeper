import React from "react";
import Board from "../board/board";

export default class Game extends React.Component{

    state = {
        height: 10,
        width: 10,
        mines: 10,
    }

    render(){

        const {height, width, mines} = this.state;

        return(

            <div>
                <Board height={height} width={width} mines={mines}/>
            </div>

        )

    }
}