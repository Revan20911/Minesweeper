import React, { useEffect } from 'react';

interface ICell  {

    setGameState: React.Dispatch<React.SetStateAction<boolean>>,
    setClicked: React.Dispatch<React.SetStateAction<number>>
    Mines: Number[],
    Index: Number,
}

const Board = () => {

    const [gameState, setGameState] = React.useState<boolean>(false);
    const [mines, setMines] = React.useState<Number[]>([]);
    const [over, setOver] = React.useState<string>("Minesweeper");
    const [clicked, setClicked] = React.useState<number>(0);
     
    const boardArr: Number[] = [];
    for(let i = 0; i < 100; i++){
        boardArr[i] = i;
    }

    useEffect(() => {

        const temp = mines;
        function generateMines(){

            var arr: Number[] = [];
            for(let i = 0; i < 10; i++ ){

                arr[i] = Math.floor(Math.random() * 100);
                setMines([ ...arr]);
            }
       
        }

        if(temp.length == 0){
            generateMines()
        }
    
    }, []);

    useEffect(() => {

        function checkIfGameIsOver(){

            if(gameState){

                if(clicked == 100){

                    setOver("You Win");
                }

                if(clicked < 100){

                    setOver("Game Over");
                }

            }
        }

        checkIfGameIsOver();
    })

    

    function resetGame(){

        setGameState(false);
    }

    return(
        <>
        <h1>{over}</h1>
        <h1>{clicked}</h1>
        <div className='Board'>
            {
                boardArr.map((index: Number, key: React.Key) => {
                    return (
                        <Cell
                        Mines={mines} 
                        key={key} 
                        setGameState={setGameState} 
                        Index={index}
                        setClicked={setClicked}
                        />
                    )
                })
            }

        </div>
        
        </>
    );
}


const Cell: React.FC<ICell> = (
    props: ICell
) => {

    const ref = React.useRef<HTMLDivElement>(null);

    const [isClicked, setIsClicked] = React.useState<boolean>(false);
    const [isMine, setIsMine] = React.useState<boolean>(false);
    const [active, setActive] = React.useState<boolean>(false);


    function cellOnClick(){

        setIsClicked(true);

        const mineClass: string = "Mine";
        const safeClass: string = "Safe";
        
        if(active == false){
            let mine: HTMLDivElement | null = ref.current;
            if(!mine){
                return;
            }

            for(let i = 0; i < 10; i++){

                if(props.Mines[i] == props.Index){

                    setIsMine(true);
                    mine.className = mineClass;
                    return;
                }

                if(props.Mines[i] != props.Index){

                    setIsMine(false);
                    mine.className = safeClass;
                }
            }
            props.setClicked(prev => prev + 1);
            setActive(true);
        }
    }

    useEffect(() => {

    
        function checkGameState(){
        
            if(isMine == true){
                if(isClicked == true){
                    props.setGameState(true);
                    
                }
                if(!isClicked == true){
                    props.setGameState(false);
                    return;
                }
            }
            console.log(isMine); 
        }

        

        checkGameState();
    });

    return(

        <div ref={ref} className='Cell'onClick={() => cellOnClick()}>


        </div>


    )


}

const Message = ({gameState}: {gameState: boolean}) => {

    let message: string = "";
    
    function setMessage(){

        if(gameState){

            return "Game Over";

        }
    }

    return(
        <div className='Message'>
            {message}
        </div>

    )
}

export default Board;