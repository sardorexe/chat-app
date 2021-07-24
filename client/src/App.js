import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import  Chat  from './components/Chat/Chat';
import  Join  from './components/Join/Join';
import "./App.css"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Join />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
