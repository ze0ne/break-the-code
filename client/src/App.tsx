import "./App.scss";
import { Route, Router } from "react-router-dom";
import Game from "./Game";


const App = () => {
  return (
    <Router>
      <Route exact path="/" render={() => <Game />}/>
    </Router>
  )
}


export default App;
