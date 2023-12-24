import React,{useState, useEffect, useContext} from 'react'
import { NavLink } from 'react-router-dom'
import Usercontext from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const {setuser, user}=useContext(Usercontext);
  const {msg, setmsg}=useContext(Usercontext);
  const navigate=useNavigate();
  const fn=()=>{
    setmsg("Logged out");
    setTimeout(()=>{
      setmsg(null);
    }, 3000);
    navigate('/login');
    setuser(null);
    
  }
  return (
   <nav className="mb-4 navbar navbar-expand-lg bg-body-tertiary fixed-top  bg-white" style={{zIndex: '1 !important'}}>
    <div className="container-fluid">
      {
        (user)?<NavLink className="navbar-brand" to="/">{user}</NavLink>:<></>
      }
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
          </li>
          {
            (user)?(<li className="nav-item">
            <NavLink className="nav-link" to="/addblog">Add Blog</NavLink>
          </li>):<></>
          
}
          <li className="nav-item">
            {
              (!user)?<NavLink className="nav-link" to="/login">Login</NavLink>:<NavLink className="nav-link" onClick={fn}>Logout</NavLink>

              
            
            
}
          </li>

        </ul>
        <form className="d-flex" role="search">
          {
            /*
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>*/

            (msg)?
            (<div className="form-control me-2" type="search"  aria-label="Search">{msg}</div>):<></>

          }
        </form>
      </div>
    </div>
  </nav>
  )
}
