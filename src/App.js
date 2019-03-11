import React, { Component } from 'react';
import './App.css';
import Header from './shared/components/Header';
import { BrowserRouter, Route } from "react-router-dom";
import UserForm from './components/Users/UserForm';
import Users from './components/Users';

class App extends Component {
  render() {
    return (
      <div>

        <div className="container">
          <BrowserRouter>
            <React.Fragment>
              <Header />
              <Route exact path="/" component={Users} />
              <Route exact path="/edit" component={UserForm} />
              <Route exact path="/add" component={UserForm} />
            </React.Fragment>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
