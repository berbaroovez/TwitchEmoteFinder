import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Box from '@material-ui/core/Box';
import Emote from '../Components/Emote'

export default  function Main(){


    const [twitchUserName, setTwitchUserName] = useState('')
    const [textFieldValue, setTextFieldValue] = useState('')
    const [twitchID, setTwitchID] = useState(null)
    const [bttvList,setBttvList] = useState(null)
    const [ffzList,setFfzList] = useState(null)
    const [ttvList, setTtvList] = useState(null)
    const [bttvReady, setBttvReady] = useState(false)
    const [ffzReady, setFfzReady] = useState(false)
    const [ttvReady, setTtvReady] = useState(false)


    useEffect(()=>{
       bttvList?setBttvReady(true):setBttvReady(false)
    },[bttvList])

    useEffect(()=>{
        ffzList?setFfzReady(true):setFfzReady(false)
     },[ffzList])

     useEffect(()=>{
        ttvList?setTtvReady(true):setTtvReady(false)
     },[ttvList])



    const params = useParams()
    useEffect(()=>{
        setTwitchUserName(params.twitchName) 
        console.log("LOADED")
       
       
    },[])


    useEffect(()=>{
        if(twitchUserName){
            validTwitchUserCheck(twitchUserName)
        }else
        {
        
        }
    },[twitchUserName])


    const validTwitchUserCheck= async (username)=>{
       await fetch(`https://api.twitch.tv/v5/users?login=${username}&client_id=xu66f5pxfyx4o4wh9nofrcodnvh5dg`)
    .then(response=>response.json())
    .then(response=>{  
        console.log(response)
            response._total===1?setTwitchID(response['users'][0]['_id']):setTwitchID(null)
    })
    }

    useEffect(()=>{
        if(twitchID){
            getBTTV()
            getFFZ()
            getTTV()
            
        }
        
    },[twitchID])

    //BTTV EMOTES
    
    const  getBTTV=()=>{
        var fullList = []
    
         fetch(`https://api.betterttv.net/3/cached/users/twitch/${twitchID}`)
         .then(response => response.json())
         .then(response=> {
             try{
               const channelEmote = response.channelEmotes
             const sharedEmote = response.sharedEmotes
             fullList= channelEmote.concat(sharedEmote)
             setBttvList(fullList)
             }
             catch(err){
                 console.log(err)
               console.log("No BTTV Emotes")
             }
         })

        }

    const getFFZ=()=>{
        fetch(`https://api.frankerfacez.com/v1/room/id/${twitchID}`)
          .then(response => response.json())
          .then(response=> {
            try{
              var test = response.sets
              var key=""
              for (var x in test){
                key = x
              }
              setFfzList(test[key]["emoticons"])
            }
            catch(err){
              console.log("No FFZ Emotes")
            }
              
              
          })
      }

      
const getTTV = () =>{
    fetch(`https://api.twitchemotes.com/api/v4/channels/${twitchID}`)
      .then(response => response.json())
      .then(response=> {
         
        try{
                setTtvList(response.emotes)
      }
      catch(err){
        console.log("Register your account at twitchemotes.com")
      }
      })
  }



    const handleEnter=(e)=>{
        return(
            e.key==='Enter'?handleSearch:null
        )
        
    }
    const handleSearch=()=>{
        setTwitchUserName(textFieldValue)
    }

    const handleUserNameChange=(event)=>{
        setTextFieldValue(event.target.value)
        
    }


    return (

        <div >
            <Header />
            <Box
        display="flex" 
      >
        <Box m="auto">
        <TextField id="standard-basic" onKeyDown={handleEnter} onChange={handleUserNameChange} />
            <Link to={`/${textFieldValue}`} >
                <Button variant="contained" color="primary" onClick={handleSearch}>
                PogU
                </Button> 
            </Link>
        </Box>
      </Box>
      <div className="bttv-emotes">
            <h2>BTTV Emotes</h2>
           <div className="e-container">
                
                
                {
                 bttvReady?
                  bttvList.map(emote =>(
                    <Emote key={emote.id} emoteName = {emote.code} url = {"https://cdn.betterttv.net/emote/"+emote.id+"/3x"} />
                  )):null
                }
              </div>
            </div>

            <div className="ffz-emotes">
          <h2>FFZ Emotes</h2>
            <div className="e-container">
            {

              ffzReady?      
            ffzList.map(emote =>(
              <Emote key={emote.id} emoteName = {emote.name} url = {emote["urls"][4]||emote["urls"][2]||emote["urls"][1]} />
            )):null

           }
            </div>
             </div>



             <div className="ttv-emotes">
                <h2>Twitch Emotes</h2>
            <div className="e-container">
            {
              ttvReady? 
             ttvList.map(emote =>(
              <Emote key={emote.id} emoteName = {emote.code} url = {"https://static-cdn.jtvnw.net/emoticons/v1/"+emote.id+"/3.0"} />
            )) :null

           }
            </div>
            

             </div>
            
           <Footer/>
            </div> //end of return

    )
}