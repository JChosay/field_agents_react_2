import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Agents from "./components/Agents";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

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

      </Switch>

    </Router>
  );
}

export default App;