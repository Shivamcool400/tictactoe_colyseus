import React,{useState,useEffect} from 'react'
import Board from './board';
import './login.css'
import Fire from './firebase'
function Login() {
    const db = Fire.database();
    const[name,setName] = useState();
    const[id,setID] = useState();
    const[show,setShow]= useState(true);
    const [player,setPlayer] = useState(1)
    const[boardshow,setBoardShow]=useState(false);
    const [roomid,setRoomId]=useState(parseInt(Math.random() * 1000000 + 1));
    const loggedin = () =>{
        if(!name){
            alert("enter the name field");
        }
        else {
            setShow(false);
            setBoardShow(true);
            db.ref('newgame' + roomid).set({
                player1: name,
                current: 1,
                roomid:roomid,
                xIsNext:true
              });


        }
          
    }
    
    const joinedin = (event)=>{
        event.preventDefault()
        if(!name){
            alert("enter the name field");
        }
        else if(!id){
            alert("enter the roomid field");
        }
        else {
            setShow(false);
            setBoardShow(true);
            setRoomId(id)
            setPlayer(2)
            db.ref('newgame' + id).update({
                player2: name,
              });
}
    }
    return (
        <div>
              
  {/* Hello world */}
  {show && <div className="container">
      
    <div className="greeting">TIC TAC TOE!</div>
    <br/>
    <br/>
    <div className="row">
        <div className="col"></div>
        <div className="col-sm-12 col-md-4 pt-3"><input className="name--input" type="text" onChange={(e)=> setName(e.target.value)} placeholder="Name" /></div>
        <div className="col-sm-12 col-md-4 pt-3"><button className="btn btn-secondary" onClick={loggedin}> CREATE ROOM </button></div>
        <div className="col"></div>
        </div>
        <br/>
        <br/>
        <div className="row">
        <div className="col"></div>
        <div className="col-sm-12 col-md-4 pt-3"><input className="join--room_input" type="text" placeholder="Room-ID" onChange={(e)=> setID(e.target.value)} /></div>
        <div className="col-sm-12 col-md-4 pt-3"> <button className="btn btn-secondary" onClick={joinedin}> JOIN </button></div>
        <div className="col"></div>
        </div>
        <div className="row">
        <div className="col"></div>
        <div className="col-sm-12 col-md-6 pt-3"> <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Instructions
</button></div>
        <div className="col"></div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Instructions</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="lead"><b>1: </b> 
  To create room type your Name and click create game
</p>
<p class="lead"><b>2: </b>
  To Join room type your Name and Room-id and then click Join game
</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        
     </div> 
  }
  {boardshow && <Board name={name} roomid={roomid} player={player}/>}
  
        </div>
    )
};

export default Login
