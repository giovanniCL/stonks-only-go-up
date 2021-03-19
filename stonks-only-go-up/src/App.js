// General Imports
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Scenes & Pages (Should import all pages here)
import TestComponent from "./Components/TestComponent"
import SetupInitialPage from "./Components/Setup/SetupInitialPage"
import SetupPersonalInfoPage from './Components/Setup/SetupPersonalInfoPage' // Not yet used
import LogInPage from './Components/Login/LogInPage';
import StonkPreviewTest from './Components/StonkPreviewTest';
import SingleStonk from './Components/SingleStonk';
import HypeStonks from './Components/HypeStonks'

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
        <Route exact path="/setup/initial" component={SetupInitialPage} />
        <Route exact path="/setup/personal-info" component={SetupPersonalInfoPage} />
        <Route exact path="/login/initial" component={LogInPage} />
        <Route exact path="/stonk-preview-test" component={StonkPreviewTest} />
        <Route exact path="/hype-stonks" component={HypeStonks} />
        <Route exact path="/single-stonk/:name" component={SingleStonk} />
      </Switch>
    </BrowserRouter>
    </div>
  )
}
export default App;
