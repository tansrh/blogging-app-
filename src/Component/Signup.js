import React,{useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import Usercontext from '../context/Usercontext'; 
export default function Signup() {


    const [formvalue, setformvalue]=useState({email:'', password:''});
    const navigate=useNavigate();
    const {setuser}=useContext(Usercontext);
    const {msg, setmsg}=useContext(Usercontext);
    const handle=(e)=>{
        
      setformvalue({...formvalue, [e.target.name]:e.target.value});
    }
    const handlesubmmit=async(e)=>{
    
        e.preventDefault();
        //console.log(formvalue);
        const reqdata=await fetch("http://slim/api/user/login");
    const resdata=await reqdata.json();

      let bool = false;
      resdata.map((udata)=>{
        if(udata.email==formvalue.email){
          setmsg("User exists");
          bool=true;
     setTimeout(()=>{
      setmsg(null);
      navigate('/login');
     }, 3000);
    
        }
      })

      if(!bool){

        const formdata={email:formvalue.email, password:formvalue.password};
        const res=await axios.post("http://slim/api/user/signup", formdata);
        setuser(formvalue.email);
        setmsg("Signup Successful");
        navigate('/blogs');
        setTimeout(()=>{
          setmsg(null);
          
         }, 3000);
       // setTimeout(()=>{navigate('/blogs');}, 3000)
      }
        
        }




  return (
    <div className='p-5'>
    <div className='m-3 p-4 flex flex-start justify-content-start'>
    <form className='p-4 border border-primary mx-5 flex-column justify-content-start' onSubmit={handlesubmmit}>
  <div class="form-group m-3 ">
   
    <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={formvalue.email} placeholder="Enter email" onChange={handle} required/>
    
  </div>
  <div class="form-group m-3 ">
   
    <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={formvalue.password} placeholder="Password" onChange={handle} required/>
  </div>
 
  <button type="submit" class="btn btn-primary">Signup</button>
  
</form>

</div>
</div>
  )
}
