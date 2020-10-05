import React from 'react';

import './App.css';
import Emote from './Emote'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitch  } from '@fortawesome/free-brands-svg-icons'
import ReactGA from 'react-ga';
// import auth from './auth.ts'; // Sample authentication provider

// const trackingId = "UA-177193971-1"; // Replace with your Google Analytics tracking ID
// ReactGA.initialize(trackingId);
// ReactGA.set({
//   userId: auth.currentUserId(),
//   // any data that is relevant to the user session
//   // that you would like to track with google analytics
// })

class App extends React.Component{
  constructor(){
    super()
    this.state= {
      bttvFullList:[],
      channelEmoteList:[],
      sharedEmoteList :[],
      ffzFullList:[],
      twitchStreamer:"",
      twitchStreamerID:"",
      url:"",
      twitchUrl:"",
      ttvFullList:[],
  }
  }


grabTwitchID =() => {
    console.log(this.state.twitchStreamer)
    fetch("https://api.twitch.tv/v5/users?login="+this.state.twitchStreamer+"&client_id=xu66f5pxfyx4o4wh9nofrcodnvh5dg")
    .then(response=>response.json())
    .then(response=>{
      try{

        
        this.setState({
        
          twitchStreamerID:response['users'][0]['_id'],
          twitchUrl:"https://www.twitch.tv/"+this.state.twitchStreamer,
          
          
        },()=>{
          console.log(this.state.twitchStreamerID)
          this.getBTTV()
          this.getFFZ()
          this.getTTV()
          
        })
      }
      catch(err){
        console.log("Username does not exist")
      }
      
    })

}



getBTTV=()=>{
  

 fetch("https://api.betterttv.net/3/cached/users/twitch/"+this.state.twitchStreamerID)
    .then(response => response.json())
    .then(response=> {
        
        

        try{
          const channelEmote = response.channelEmotes
        const sharedEmote = response.sharedEmotes
          const fullList = channelEmote.concat(sharedEmote)
          this.setState({
            channelEmoteList :channelEmote,
            sharedEmoteList:sharedEmote,
            bttvFullList:fullList,
        })
        }
        catch(err){
          console.log("No BTTV Emotes")
        }
       

        
    })

}

getFFZ=()=>{
  fetch("https://api.frankerfacez.com/v1/room/id/"+this.state.twitchStreamerID)
    .then(response => response.json())
    .then(response=> {

      try{
        var test = response.sets
        var key=""
        for (var x in test){
          key = x
        }
        
        this.setState({
          ffzFullList:test[key]["emoticons"]
        })
      }
      catch(err){
        console.log("No FFZ Emotes")
      }
        
        
    })
}

getTTV = () =>{
  

  fetch("https://api.twitchemotes.com/api/v4/channels/"+this.state.twitchStreamerID)
    .then(response => response.json())
    .then(response=> {
       
      try{
      this.setState({
        ttvFullList:response.emotes
      })
    }
    catch(err){
      console.log("Register your account at twitchemotes.com")
    }
    })
}
streamerListner=(event) =>{
  this.setState({
    twitchStreamer:event.target.value
  })



}

  render(){
    return(
        
      <div>
        <Navbar className='mainNavbar py-3'expand="lg" >
            <Navbar.Brand className="mx-auto"href="#"><a className ="navLink" href="https://www.twitch.tv/Berbaroovez"><FontAwesomeIcon icon={faTwitch} />   Berbaroovez</a></Navbar.Brand>
          </Navbar>
      
      <Container>
        
        <div className="username">
        

        <InputGroup className="searchbar mb-3">
            <FormControl onChange={this.streamerListner}
              placeholder="Twitch Username"
              aria-label="Twitch Username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick = {this.grabTwitchID} className='mainBTN font-weight-bold' variant=" outline-secondary">Poggers</Button>
            </InputGroup.Append>
          </InputGroup>

            {this.state.twitchUrl ? <a href={this.state.twitchUrl}><p>{this.state.twitchStreamer}</p></a> : null}
            {/* {console.log("User "+this.state.twitchUrl)} */}
        </div>
        
        {/* <p>{this.state.twitchStreamerID}</p>
        <p>{this.state.twitchStreamer}</p> */}

        <Row>
          <Col md={6}>
          <div className="bttv-emotes">
            <h2>BTTV Emotes</h2>
           <div className="e-container">
                
                
                {

                  this.state.bttvFullList.map(emote =>(
                    <Emote key={emote.id} emoteName = {emote.code} url = {"https://cdn.betterttv.net/emote/"+emote.id+"/3x"} />
                  ))
                  }
              </div>
            </div>
          </Col>
          <Col md={6}>
          
          <div className="ffz-emotes">
          <h2>FFZ Emotes</h2>
            <div className="e-container">
            {


             this.state.ffzFullList.map(emote =>(
              <Emote key={emote.id} emoteName = {emote.name} url = {emote["urls"][4]||emote["urls"][2]||emote["urls"][1]} />
            ))

           }
            </div>
            

             </div>
             </Col>
        </Row>

        <Row>
        <div className="ttv-emotes">
          <h2>Twitch Emotes</h2>
            <div className="e-container">
            {
              this.state.ttvFullList? 
             this.state.ttvFullList.map(emote =>(
              <Emote key={emote.id} emoteName = {emote.code} url = {"https://static-cdn.jtvnw.net/emoticons/v1/"+emote.id+"/3.0"} />
            )) : null

           }
            </div>
            

             </div>
        </Row>
            
           
             
           
        
      
        
             </Container>
             </div>  
    )
  }
}

export default App;
