import React  from 'react';
import NavBar from './components/navbar/Navbar';
import Banner from "./components/banner/Banner";


function App({}) {

    return (

        <div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
            </style>
            <Banner/>
            <NavBar/>


        </div>

  );
}

export default App;