import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from '../home/Home';
import Presentation from '../presentation/Presentation';
import Contact from '../contact/Contact';
import NotFound from "../NotFound";
import './Navbar.css'
import Catalogue from "../catalogue/Catalogue";

function NavBar({}) {

    return (

        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className="nav-link"> Home </Link></li>
                        <li><Link to={'/catalogue'} className="nav-link"> Catalogue </Link></li>
                        <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
                        <li><Link to={'/about'} className="nav-link">About</Link></li>
                    </ul>
                </nav>
                <hr />
                <Switch>
                    <Route exact path='/'  render={() => <Home/>} />
                    <Route path='/catalogue'  render={() => <Catalogue key={Math.random()}/>} />
                    <Route path='/contact' component={Contact} />
                    <Route path='/about' component={Presentation} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default NavBar;