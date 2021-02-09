import React  from 'react';
import NavBar from './components/navbar/Navbar';
import Banner from "./components/banner/Banner";
import './App.css';


function App({}) {

    return (


        <div>
            <header>
                {/*<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />*/}
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
                </style>
            </header>

            <Banner/>
            <NavBar/>


        </div>

  );
}

export default App;