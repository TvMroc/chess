import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ChessContainer from "./components/Pages/Chess/Container";
import PlayerContainer from "./components/Pages/Player/Container";
import Layout from "./Layout";
import { Box } from "@mui/material";

function App() {

  return (
    <Box display='flex' flexDirection='column' alignItems='center' width='100vw'>
      <Layout/>
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/chess" component={ChessContainer}/>
          
          <Route path="/player/:id">
            {params => <PlayerContainer username={params.id} />}
          </Route>
          <Route path="*">404: No such page!</Route>
        </Switch>
      </Router>
    </Box>
  )
}

export default App
