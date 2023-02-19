import React from "react";
import mine from "assets/exploded_bomb.png";
import flag from "assets/flagged_bomb.png";

export default class Cell extends React.Component{
    getValue(){

        if(this.props.isOpen){
            return this.props.value.isMine ? <img src={mine}/> : null
        }

        if(this.props.value.isMine){

            return <img src={mine}/>
        }

        if(this.props.value.isFlagged){

            return <img src={flag}/>
        }
    }

    render(){
        let className = 
        "cell" + 
        (this.props.value.isOpen ? "open " : " ") +
        (this.props.value.isMine ? "mine" : " ")+
        (this.props.value.isFlagged ? "flag" : "");

        return(
            <div ref={"cell"} className={className} onClick={this.props.onClick}>
                {this.getValue()}
            </div>
        )
    }
}