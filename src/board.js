import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {GiCrossMark,GiMagicSwirl} from 'react-icons/gi'
import Fire from './firebase'


function Board({name, roomid, player}) {
    const db = Fire.database();
    function toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
          if (arr[i] !== undefined) rv[i] = arr[i];
        return rv;
      }
      const [board, setBoard] = useState(Array(9).fill(null));
    const [opponent,setOpponent]= useState("waiting to join!")
    const [xIsNext, setXisNext] = useState(true);
    const [host,setHost] = useState();
    const [person,setPerson]= useState()
    const [current,setCurrent]=useState();
    const  calculateWinner=(squares)=> {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        if (board == null){
            window.location.reload()
        }
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                if (squares[a] == "X"){
                    return host;
                }else {
                    return person;
                }
                
            }
        }
        return null;
    }
    
const winner = calculateWinner(board)
const modify=()=> {
    var starCountRef = db.ref('newgame' + roomid + '/board');
      starCountRef.on('value', (snapshot) => {
        setBoard(snapshot.val());
        // console.log(snapshot.val())
        // updateStarCount(postElement, data);
        
      });
      var starCountRef = db.ref('newgame' + roomid + '/current');
      starCountRef.on('value', (snapshot) => {
        setCurrent(snapshot.val());
        // console.log(snapshot.val())
        // updateStarCount(postElement, data);
        
      });
      var starCountRef = db.ref('newgame' + roomid + '/xIsNext');
      starCountRef.on('value', (snapshot) => {
        setXisNext(snapshot.val());
        // console.log(snapshot.val())
        // updateStarCount(postElement, data);
     });
     if(player == 1){
        var starCountRef = db.ref('newgame' + roomid + '/player2');
        starCountRef.on('value', (snapshot) => {
            if(snapshot.val() != null){
                setOpponent(snapshot.val());
            }
          
        //   console.log(snapshot.val())
          // updateStarCount(postElement, data);

        //   if(opponent == null){
        //       setOpponent("waiting to join")
        //   }
       });
     }
    
     if(player == 2){
        var starCountRef = db.ref('newgame' + roomid + '/player1');
        starCountRef.on('value', (snapshot) => {
            if(snapshot.val() != null){
                setOpponent(snapshot.val());
            }
            else{
                alert("enter correct roomid")
                window.location.reload()
            }
          // console.log(snapshot.val())
          // updateStarCount(postElement, data);
       });
     }
     var starCountRef = db.ref('newgame' + roomid + '/player1');
        starCountRef.on('value', (snapshot) => {
            if(snapshot.val() != null){
                setHost(snapshot.val());
            }
          
        //   console.log(snapshot.val())
          // updateStarCount(postElement, data);

        //   if(opponent == null){
        //       setOpponent("waiting to join")
        //   }
       });
       var starCountRef = db.ref('newgame' + roomid + '/player2');
        starCountRef.on('value', (snapshot) => {
            if(snapshot.val() != null){
                setPerson(snapshot.val());
            }
          
        //   console.log(snapshot.val())
          // updateStarCount(postElement, data);

        //   if(opponent == null){
        //       setOpponent("waiting to join")
        //   }
       });
      
}
useEffect(() => {

    db.ref('newgame' + roomid).update({
        winner: false,
        board: {
            0: "",
            1: "",
            3: "",
            2: "",
            5: "",
            4: "",
            6: "",
            7: "",
            8: "",
             },

      });
      
    modify()
    console.log(board)
    console.log(player)
}, []);


const drawn = ()=> {
    if (!winner){
        for (let i = 0; i< board.length; i++){
            if(board[i]==""){
              count = 1
             } 
        }
       if (count != 1){
           return true
       } }  
       return null

    }
var count = 0
const draw = drawn();



    const handleinput =(e)=>{
        if (opponent == "waiting to join!"){
            alert("wait for other player to join")
            return
        }
       console.log(current)
       // If user click an occupied square or if game is won, return
       const boardCopy = [...board];
    if (winner || boardCopy[e.target.value] || draw) return;
      if(current != player){
          alert("wait for your turn")
          return
      }
    
        
        
        
        // Put an X or an O in the clicked square
        
        boardCopy[e.target.value] = xIsNext ? "X" : "O";
        const load = toObject(boardCopy);
        if (player == 1){
            db.ref('newgame' + roomid).update({
                current: 2,
                xIsNext:false,
                board: load
        
              });
            
        }
        else {
            db.ref('newgame' + roomid).update({
                current: 1,
                xIsNext:true,
                board: load
        
              });
              
        }
        console.log(current)
        setBoard(boardCopy);
        
        drawn()
    } 

    
         
      
    
    console.log(host)
    console.log(person)
    
    

    



     
    return (
         <div>
             <Border>
                 <br/>
                 <br/>
                 <h1>TIC TAC TOE </h1>
                 <br/>
                 <br/>
                <div className="row">
               
               <div className="col-sm-12 col-md-6">
                   <div className="row">
                   <div className="col"></div>
                       <div className="col-sm-12 col-md-6"><h4>Player: {name}</h4></div>
                       <div className="col"></div>
                   </div>
                   <div className="row">
                   <div className="col"></div>
                       <div className="col-sm-12 col-md-6"><h4>Opponent: {opponent}</h4></div>
                       <div className="col"></div>
                   </div>
                   </div>
               <div className="col-sm-12 col-md-6"><h4>Room code: {roomid}</h4></div>
               
           </div>
           <br/>
           <br/>
           <div className="row">
               <div className="col"></div>
               <button className="col-sm-12 col-md-3 line" value="0" onClick={handleinput}>{board[0]}</button>
               <button className="col-sm-12 col-md-3 line" value="1" onClick={handleinput}>{board[1]}</button>
               <button className="col-sm-12 col-md-3 line" value="2" onClick={handleinput}>{board[2]}</button>
               <div className="col"></div>
           </div>
           <div className="row">
               <div className="col"></div>
               <button className="col-sm-12 col-md-3 line" value="3" onClick={handleinput}>{board[3]}</button>
               <button className="col-sm-12 col-md-3 line" value="4" onClick={handleinput}>{board[4]}</button>
               <button className="col-sm-12 col-md-3 line" value="5" onClick={handleinput}>{board[5]}</button>
               <div className="col"></div>
           </div>
           <div className="row">
               <div className="col"></div>
               <button className="col-sm-12 col-md-3 line" value="6" onClick={handleinput}>{board[6]}</button>
               <button className="col-sm-12 col-md-3 line" value="7" onClick={handleinput}>{board[7]}</button>
               <button className="col-sm-12 col-md-3 line" value="8" onClick={handleinput}>{board[8]}</button>
               <div className="col"></div>
           </div>
           <br/>
           <br/>
          <p> <b>{draw ? "match is drawn" :  <p>
      {winner ? "Winner: " + winner : "current turn: " + (xIsNext ? host : person)}
    </p> }
    </b>
          </p>
          {winner || draw ? <div className="row">
               <div className="col"></div>
               <div className="col-sm-12 col-md-4">
               <button className="btn btn-secondary" onClick={()=>window.location.reload()}>Exit</button>
               </div>
               <div className="col"></div>
               </div> : null}
          
           </Border>
            
        </div>
    )
}

const Border = styled.section`
.line {width: 100px;
height: 100px;
color: black;
border: 4px solid black;
}
p {
    color:black;
    font-size: 20px;
}
`

export default Board
