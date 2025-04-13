import { Route, Router, Switch } from "wouter";
import ChessContainer from "./components/Pages/Chess/Container";
import PlayerContainer from "./components/Pages/Player/Container";
import Layout from "./Layout";
import { Box } from "@mui/material";

const App = () => (
  <Box display='flex' flexDirection='column' alignItems='center' width='100vw'>
    <Router>
      <Layout />
      <Switch>
        <Route path="/player/:id">
          {params => <PlayerContainer username={params.id} />}
        </Route>
        <Route path="/" component={ChessContainer}/>
        <Route path="*">404: No such page!</Route>
      </Switch>
    </Router>
  </Box>
)

export default App;
