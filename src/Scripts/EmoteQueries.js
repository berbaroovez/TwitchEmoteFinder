export const  getBTTV=    twitchID=>{
    
    var fullList = []

    return fetch(`https://api.betterttv.net/3/cached/users/twitch/${twitchID}`)
     .then(response => response.json())
     .then(response=> {
         try{
           const channelEmote = response.channelEmotes
         const sharedEmote = response.sharedEmotes
         fullList= channelEmote.concat(sharedEmote)
         
         }
         catch(err){
             console.log(err)
           console.log("No BTTV Emotes")
         }
     })
     

     

    
    
 }