import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ClashContainer from "./Pages/Clash/Container";

function App() {

  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/about">About Us</Route>
        <Route path="/clash" component={ClashContainer}/>
        <Route path="*">404: No such page!</Route>
      </Switch>
    </Router>
  )
}

export default App
