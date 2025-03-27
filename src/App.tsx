import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ChessContainer from "./components/Pages/Chess/Container";

function App() {

  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/">About Us</Route>
        <Route path="/chess" component={ChessContainer}/>
        <Route path="*">404: No such page!</Route>
      </Switch>
    </Router>
  )
}

export default App
