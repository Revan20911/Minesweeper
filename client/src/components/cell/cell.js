import React from "react";
import mine from "../assets/exploded_bomb.png";
import flag from "../assets/flagged_bomb.png";
import closed from "../assets/closed.png";

export default class Cell extends React.Component{
    getValue(){

        if(this.props.value.neighbour === 0 ){
            return <img src={closed} alt="" />;
        }

        if(this.props.value.isFlagged == true){
            return <img src={flag} alt=""/>
        }
    }

    render(){
        let className = "cell";

        console.log(this.props.value);
        

        return(
            <div  className={className} >
                {this.getValue()}
            </div>
        );
    }
}