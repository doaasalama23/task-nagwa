import { Component } from 'react';
import Home from '../Home/Home.jsx';
import Footer from '../Footer/Footer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import Notfound from '../Notfound/Notfound.jsx';
import { Route, Routes } from 'react-router-dom';
export default class App extends Component
{
  state={
    name:"doaaaaa salama",
    age:30
  }
  render(){
    return(
      <>
      <Navbar/>
        {/* <div className='container'> */}
          <Routes>
            <Route path='home' element={ <Home />}>
            </Route>
            <Route path='*' element={<Notfound/>}>
            </Route>
          </Routes>  
        {/* </div> */}
      <Footer/>
      </>
    ) 
  }
}

