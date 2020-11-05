import React from 'react';
import './App.css';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import ContextComponent from './react-components/ContextComponent';
import Home from './react-components/Home';
import CourseCreation from './react-components/CourseCreation';
import DetailedCoursePage from './react-components/DetailedCoursePage';
import AuthSystem from './react-components/AuthSystem';
import UserDashboard from './react-components/UserDashboard';
import AdminDashboard from './react-components/AdminDashboard';
import MessageCenter from './react-components/MessageCenter';
import UserProfile from './react-components/UserProfile';

class App extends React.Component {

  // a 'global' state that you can pass through to any child componenets of App.
  //   In the Routes below they are passed to both the Home and Queue states.

  
  state = {
    term: "Fall 2020"
  }

  render() {
    return (
        <ContextComponent>
          <BrowserRouter>
            <Switch>
              { /* Didn't delete the state passing function since we may need it. */ }
              <Route exact path='/' render={() => 
                              (<Home appState={this.state}/>)}/>
              <Route exact path='/CourseCreation' render={() => 
                              (<CourseCreation appState={this.state}/>)}/>
              <Route exact path='/DetailedCoursePage' render={() => 
                              (<DetailedCoursePage appState={this.state}/>)}/>
              <Route exact path='/AuthSystem' render={() => 
                              (<AuthSystem appState={this.state}/>)}/>
              <Route exact path='/UserDashboard' render={() => 
                              (<UserDashboard appState={this.state}/>)}/>
              <Route exact path='/AdminDashboard' render={() => 
                              (<AdminDashboard appState={this.state}/>)}/>
              <Route exact path='/MessageCenter' render={() => 
                              (<MessageCenter appState={this.state}/>)}/>
              <Route exact path='/UserProfile/:userId' render={(props) => 
                              (<UserProfile appState={this.state} {...props}/>)}/>
            </Switch>
          </BrowserRouter>
        </ContextComponent>
    );  
  }
}

export default App;
