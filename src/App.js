import React from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import AddContact from './components/AddContact/AddContact';
import EditContact from './components/EditContact/EditContact';
import ShowContact from './components/ShowContact/ShowContact';

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>

        <Route path="/add" component={AddContact}/>

        <Route path="/edit/:id" component={EditContact}/>

        <Route path="/profile/:id" component={ShowContact}/>
      </Switch>
    </div>
  );
}

export default App;
