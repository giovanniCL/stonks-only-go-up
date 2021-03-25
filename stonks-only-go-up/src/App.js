// General Imports
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Scenes & Pages (Should import all pages here)
import TestComponent from "./Components/TestComponent"
import SignUp from './Components/Signup/SignUp'
import LogInPage from './Components/Login/LogInPage';
import SingleStonk from './Components/SingleStonk';
import HypeStonks from './Components/HypeStonks'
import FollowedStonks from './Components/FollowedStonks'

import SetupInitialPage from "./Components/Setup/SetupInitialPage"
import SetupPersonalInfoPage from './Components/Setup/SetupPersonalInfoPage'
import SetupInterestPage from './Components/Setup/SetupInterestPage'
import SetupStonkPage from './Components/Setup/SetupStonkPage'
import SetupProfilePicturePage from './Components/Setup/SetupProfilePicturePage'
import SetupConfirmPage from './Components/Setup/SetupConfirmPage'

import SetupRoute from "./Components/Setup/SetupRoute"

// App Component
// This is the MAIN component that should be treated 
// as the parent of all components/pages within this app
function App () {
  console.log("App Component Mounted")
  return (
    <div className="App"> 
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TestComponent} /> {/* Each PAGE should follow this format */}

        <Route exact path="/Signup/" component={SignUp} />
        <SetupRoute exact path="/setup/initial" component={SetupInitialPage} />
        <SetupRoute exact path="/setup/personal-info" component={SetupPersonalInfoPage} />
        <SetupRoute exact path="/setup/interest-suggest" component={SetupInterestPage} />
        <SetupRoute exact path="/setup/stonk-suggest" component={SetupStonkPage} />
        <SetupRoute exact path="/setup/profile-picture" component={SetupProfilePicturePage} />
        <SetupRoute exact path="/setup/confirm" component={SetupConfirmPage} />
        <Route exact path="/login/initial" component={LogInPage} />
        <Route exact path="/hype-stonks" component={HypeStonks} />
        <Route exact path="/followed-stonks" component={FollowedStonks} />
        <Route exact path="/single-stonk/:name" component={SingleStonk} />
      </Switch>
    </BrowserRouter>
    </div>
  )
}
export default App;
