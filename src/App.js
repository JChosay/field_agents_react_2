import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Agents from "./components/Agents";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>

      <Header />
      
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/agents">
          <Agents />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        
        <Route path="*">
          <NotFound />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;