import React from 'react'


export default function Emote(props){


    return (
        
            <div className="emote">
            <img src={props.url} alt=""></img>
            <p className="emote-label">{props.emoteName}</p>
            </div>
            
       
        
    )
}