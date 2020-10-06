import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Pages/Main'
import './index.css';
import Analytics from 'react-router-ga';

import * as serviceWorker from './serviceWorker';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {Helmet} from 'react-helmet'

ReactDOM.render(
  
  <React.StrictMode>
    <Helmet>
    <meta charset="utf-8" />
    <link rel="icon" href={process.env.PUBLIC_URL + "/berb.ico"} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="twitch emote finder"
      content="Website used to search for better twitch tv and franker face z emotes, BTZZ FFZ twitch emotes search"
    />
    <title>Twitch Emote Finder</title>
    </Helmet>
    <Router>
    <Analytics id="UA-179720764-1" debug>
    <Switch>
        <Route exact path="/">
                        <Main/>
            </Route>
            <Route exact path="/:twitchName">
                        <Main/>
            </Route>
        </Switch>
      </Analytics>
    </Router>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
