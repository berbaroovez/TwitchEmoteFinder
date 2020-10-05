import React from 'react'


function Emote(props){


    return (
        
            <div className="emote">
            <img src={props.url} alt=""></img>
            <p className="emote-label">{props.emoteName}</p>
            </div>
            
       
        
    )
}



export default Emote