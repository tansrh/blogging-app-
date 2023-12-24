import React, {useState,useEffect, useContext} from 'react'
import View from './View';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Usercontext from '../context/Usercontext';
export default function Blogs() {

  const [data, setdata]=useState([]);
  const {user}=useContext(Usercontext);
  const {mod, setmod}=useContext(Usercontext);
  useEffect(()=>{

getdata();
setTimeout(async()=>{
  const newmodreq=await fetch("http://slim/api/moderator/"+user);
  const newmoddata=await newmodreq.json();
  if(newmoddata.length>0 && newmoddata[0].upvote>=10){
      setmod(true);
  }
  else{
    setmod(false);
  }

}, 8000);
  }, []);


  



  const getdata=async()=>{
    const reqdata=await fetch("http://slim/api/blogs");
    const resdata=await reqdata.json();
    
    setdata(resdata);
   // //console.log(resdata);
    }
 const handledelete=async(id)=>{
  const res=await axios.delete("http://slim/api/blog/delete/"+id);
  getdata();
 }

  return (
    <div className='p-5'>
<div className="m-3 d-flex flex-wrap justify-content-center"> 
{
data.map((udata, index) => {
  //console.log(udata.id);
  return <div key={index} className="card m-3 p-1 flex flex-row flex-wrap justify-content-start align-items-center flex-start" style={{height : '40%',width : '40%', border: '2px solid black'}}>
    <div>
  <img style={{height : '50%',width : '40%'}} src="https://imgs.search.brave.com/dNHjgXbP2JSl_7IxQjHiF0juNJD2G27ltPBCR1aevqM/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Ny83Yi9Db2RlY2hl/ZiUyOG5ldyUyOV9s/b2dvLnN2Zy81MTJw/eC1Db2RlY2hlZiUy/OG5ldyUyOV9sb2dv/LnN2Zy5wbmc" alt="Card image cap"/>
  </div>
  <div className="card-body">
    <h5 className="card-title"><b>{udata.title}</b></h5>
    <p className="card-text"><b>{"Date: "+udata.auth_date}</b></p>
    <p className="card-text">{udata.content.substring(0, 30)+"..."}</p>
    <Link to={`/view/${udata.id}`} className='btn btn-success m-1' >Read More</Link>
    {
      (user==udata.email)?<div className='btn btn-danger m-1' onClick={()=>handledelete(udata.id)}>Delete</div>:<></>
    }
    
    
  </div>
</div>})


}
</div>
</div>
  )


}
