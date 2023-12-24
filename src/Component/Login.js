import React,{useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Usercontext from '../context/Usercontext'; 
import { useNavigate } from 'react-router-dom';
export default function Login() {


  const [data, setdata]=useState([]);
  const [formvalue, setformvalue]=useState({email:'', password:''});
const navigate=useNavigate();
const {setuser}=useContext(Usercontext);
const {setmsg}=useContext(Usercontext);
const handle=(e)=>{
    
  setformvalue({...formvalue, [e.target.name]:e.target.value});
}
  const handlesubmmit=async(e)=>{
    
    const reqdata=await fetch("http://slim/api/user/login");
    const resdata=await reqdata.json();
    
    setdata(resdata);

    //console.log(data);
    let bool=false;
   data.map((udata) =>( (udata.email===formvalue.email && udata.passwords===formvalue.password) ?(navigate('/blogs'), setuser(formvalue.email), setmsg("Logged in"),
   bool =true
   , setTimeout(()=>{
    setmsg(null);
   }, 3000)  ):{
      
    }))


if(!bool && formvalue.email.length>0){
    setmsg("Invalid Credentials");
     setTimeout(()=>{
      setmsg(null);
     }, 3000);
    
}


    }
    
    useEffect(()=>{

      handlesubmmit();
        }, []);

  
  return (
    <div className='p-5'>
    <div className='m-3 p-4 flex flex-start justify-content-start'> 
    <div className='p-4 border border-primary mx-5 flex-column justify-content-start'>
  <div class="form-group m-3 ">
   
    <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={formvalue.email} placeholder="Enter email" onChange={handle} required/>
    
  </div>
  <div class="form-group m-3 ">
   
    <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={formvalue.password} placeholder="Password" onChange={handle} required/>
  </div>
 
  <button type="submit" class="btn btn-primary" onClick={handlesubmmit}>Login</button>
  
</div>
<div className='m-2'>Not registered yet? <Link to="/signup" class="btn btn-primary m-3">Signup</Link></div>
</div>
</div>
  )
}
