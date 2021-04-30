// General Imports
import React, { createContext, useState, useEffect } from "react"
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Scenes & Pages (Should import all pages here)
import TestComponent from "./Components/TestComponent"
import SignUp from './Components/Signup/SignUp'
import LogInPage from './Components/Login/LogInPage';
import ResetPage from './Components/Reset/ResetPage';

import SingleStonk from './Components/Stonks/SingleStonk';
import HypeStonks from './Components/Stonks/HypeStonks'
import FollowedStonks from './Components/Stonks/FollowedStonks'

import MissionPage from './Components/Mission/Mission'
import Dashboard from './Components/Dashboard'

import SetupInitialPage from "./Components/Setup/SetupInitialPage"
import SetupPersonalInfoPage from './Components/Setup/SetupPersonalInfoPage'
import SetupInterestPage from './Components/Setup/SetupInterestPage'
import SetupStonkPage from './Components/Setup/SetupStonkPage'
import SetupProfilePicturePage from './Components/Setup/SetupProfilePicturePage'
import SetupConfirmPage from './Components/Setup/SetupConfirmPage'

import SetupRoute from "./Components/Setup/SetupRoute"

import AuthProvider from "./AuthContext";


// App Component
// This is the MAIN component that should be treated 
// as the parent of all components/pages within this app
function App() {
  console.warn = console.error = () => { }; // Stops all yellow warning errors
  
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={TestComponent} /> {/* Each PAGE should follow this format */}

            <Route exact path="/signup" component={SignUp} />
            <SetupRoute exact path="/setup/initial" component={SetupInitialPage} />
            <SetupRoute exact path="/setup/personal-info" component={SetupPersonalInfoPage} />
            <SetupRoute exact path="/setup/interest-suggest" component={SetupInterestPage} />
            <SetupRoute exact path="/setup/stonk-suggest" component={SetupStonkPage} />
            <SetupRoute exact path="/setup/profile-picture" component={SetupProfilePicturePage} />
            <SetupRoute exact path="/setup/confirm" component={SetupConfirmPage} />
            <Route exact path="/login/initial" component={LogInPage} />
            <Route exact path="/reset/initial" component={ResetPage} />
            <Route exact path="/hype-stonks" component={HypeStonks} />
            <Route exact path="/followed-stonks" component={FollowedStonks} />
            <Route exact path="/single-stonk/:name" component={SingleStonk} />
            <Route exact path="/mission" component={MissionPage} />
            <Route exact path="/dashboard" component={Dashboard} />

          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </div >
  )
}
export default App;
