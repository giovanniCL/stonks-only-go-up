// General Imports
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Scenes & Pages (Should import all pages here)
import TestComponent from "./Components/TestComponent"
import StonkPreviewTest from './Components/StonkPreviewTest';
import SingleStonk from './Components/SingleStonk';

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
const App = () => {
  console.log("App Component Mounted")
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={TestComponent} /> {/* Each PAGE should follow this format */}
        
        <SetupRoute exact path="/setup/initial" component={SetupInitialPage} />
        <SetupRoute exact path="/setup/personal-info" component={SetupPersonalInfoPage} />
        <SetupRoute exact path="/setup/interest-suggest" component={SetupInterestPage} />
        <SetupRoute exact path="/setup/stonk-suggest" component={SetupStonkPage} />
        <SetupRoute exact path="/setup/profile-picture" component={SetupProfilePicturePage} />
        <SetupRoute exact path="/setup/confirm" component={SetupConfirmPage} />

        <Route exact path="/stonk-preview-test" component={StonkPreviewTest} />
        <Route exact path="/single-stonk/:name" component={SingleStonk} />
      </Switch>
    </BrowserRouter>
  )
}
export default App;
