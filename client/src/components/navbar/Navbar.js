import React, {useState} from 'react'
import { Link } from "react-router-dom"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { GiConvergenceTarget } from "react-icons/gi"
import './NavbarStyle.css'
import {FaBars, FaTimes} from 'react-icons/fa'

function Navbar() {
  const [nav,setNav] = useState(false);
  const handleNav = () => setNav(!nav);

  return (
    <div className='navbar'>
        <div className='container'>
            <div className='logo'>
                <GiConvergenceTarget className='icon'/>
                <h1>Test</h1>
            </div>

            <ul className={nav ? 'nav-menu active' : 'nav-menu'}>
                <li>Home</li>
                <li>Highscores</li>
                <Router>
                <Link to="/register">Register</Link>
                </Router>
                <button>Sign in</button>
            </ul>
            <div className='hamburger' onClick={handleNav}>
              {!nav ? (<FaBars className='icon' />) : (<FaTimes className='icon' />)}
            </div>
        </div>
    </div>
    
  )
}

export default Navbar