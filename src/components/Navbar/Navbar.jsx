import { Component } from 'react';
import { Link } from 'react-router-dom';
import notimage from '../../images/logo.png';
import style from './Navbar.module.css'
export default class Navbar extends Component
{
  state={
    name:"doaaaaa",
    age:30
  }
  render(){
    return(
     
      <nav className={`${style.red} navbar navbar-expand-lg navbar-light`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img className='w-50' src={notimage} alt='fff'></img></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <Link className="nav-link" to='home'>ALL COUNTRIES</Link>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
    
    )
      
  }
}