import React from "react";
import mine from "../assets/exploded_bomb.png";
import flag from "../assets/flagged_bomb.png";
import closed from "../assets/closed.png";
import open from "../assets/open.png";
import one from "../assets/one.png";

export default class Cell extends React.Component{
    getImage(){

 if(this.props.value.isOpen != false && this.props.value.isFlagged != true){

                if(this.props.value.isMine == true){
                    return <img src={mine} alt=""/>
                }

                if(this.props.value.isMine != true){
                    return <img src={open}/>
                }
            }

            if(this.props.value.isOne == true){

                return <img alt="" src={one}/>


            }

        

            if(this.props.value.isOpen == false){
                return <img src={closed} alt=""/>
            }

            if(this.props.value.isFlagged == true){

                return <img alt="" src={flag}/>
            }
    }


    render(){
        let className = "cell";

        console.log(this.props.value.isOpen)

        return(
            <div  className={className} onClick={this.props.onClick} >
                {this.getImage()}
            </div>
        );
    }
}
