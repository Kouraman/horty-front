import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../home/Home';
import About from '../about/About';
import Contact from '../contact/Contact';
import NotFound from "../NotFound";
import './Navbar.css'

function NavBar({}) {

    return (

        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className="nav-link"> Home </Link></li>
                        <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
                        <li><Link to={'/about'} className="nav-link">About</Link></li>
                    </ul>
                </nav>
                <hr />
                <Switch>
                    <Route exact path='/'  render={() => <Home key={Math.random()}/>} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/about' component={About} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default NavBar;