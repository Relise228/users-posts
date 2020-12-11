import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Users from './components/Users/Users';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';

function App() {
  return (
    <div className='app'>
      <div className='wrapper'>
        <Switch>
          <Route path='/' exact component={Users} />
          <Route path='/posts/:id' component={Posts} />
          <Route path='/post/:id' component={Post} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
