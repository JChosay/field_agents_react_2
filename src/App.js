import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Agents from "./components/Agents";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { useState } from "react";
import { DeleteAgentForm } from "./components/DeleteAgentForm";
import { Redirect } from "react-router-dom";
import AuthContext from "./AuthContext";
import AddAgent from "./components/AddAgent";
import EditAgent from "./components/EditAgent";
import jwt_decode from 'jwt-decode';
import AgentForm from "./components/AgentForm";

const TOKEN_KEY = "user-api-token";

function App() {

  const [user, setUser] = useState(null);

  const login = (token) => {
    console.log(token);

    localStorage.setItem(TOKEN_KEY, token);

    const tokenObj = jwt_decode(token);
    console.log(tokenObj);

    const { sub: username, authorities: roleString } = tokenObj;

    const roles = roleString.split(',');

    const user = {
      username,
      roles,
      token,
      hasRole(role) {
        return roles.includes(role);
      }
    }
    console.log(user);

    setUser(user);

    return user;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={auth}>

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
            {auth.user ? <AgentForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/agent/add">
            {auth.user ? <AddAgent /> : <Redirect to="/login" />}
          </Route>

          <Route path="/agent/edit/:id">
            {auth.user ? <EditAgent /> : <Redirect to="/login" />}
          </Route>

          <Route path="/agent/delete/:id">
            {auth.user ? <DeleteAgentForm /> : <Redirect to="/login" />}
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>

      </Router>

    </AuthContext.Provider>
  );
}

export default App;