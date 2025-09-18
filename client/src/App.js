import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import './App.css';
import Hero from './components/hero/Hero';
import Navbar from './components/navbar/Navbar';
import WordGame from './components/wordgame/WordGame';
import Dashboard from './components/Login/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Login/Register';



function App() {

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/verify", {
        method: "GET",
        headers: { jwtToken: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);


  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Navbar />
      <Hero />
        <Router>
          <Route exact path='/login' render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} />) : ( <Redirect to="/dashboard" /> )}/>
          <Route exact path='/register' render={props => !isAuthenticated ? (<Register {...props} setAuth={setAuth} />) : ( <Redirect to="/dashboard" /> )}/>
          <Route exact path='/dashboard' render={props => isAuthenticated ? (<Dashboard {...props} setAuth={setAuth} />) : ( <Redirect to="/login" /> )}/>
        </Router>
      <WordGame />
    </>
  );
}

export default App;
