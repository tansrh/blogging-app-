import React,{useState, useContext} from 'react'
import axios from 'axios';
import Usercontext from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';
export default function Addblog() {
const [formvalue, setformvalue]=useState({title:'', content:'', auth_date:''});
const navigate=useNavigate();
const {user}=useContext(Usercontext);
const {setmsg}=useContext(Usercontext);
const handle=(e)=>{
    
    setformvalue({...formvalue, [e.target.name]:e.target.value});
}
const handlesubmmit=async(e)=>{
    
e.preventDefault();
//console.log(formvalue);
const formdata={title:formvalue.title, content:formvalue.content, auth_date:formvalue.auth_date, email:user};
const res=await axios.post("http://slim/api/blog/add", formdata);
setmsg("Blog added");
navigate('/blogs');

    

}
  return (
    <div className='p-5'>
    <form className="m-3  border border-primary p-3" onSubmit={handlesubmmit}>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="exampleInputEmail1"  name="title" value={formvalue.title} placeholder="Enter the blog title." onChange={handle} required/>
    
  </div>
  <div className="mb-3">
   
    <textarea className="form-control" id="validationTextarea"  name="content" value={formvalue.content}  placeholder="Write the blog here." rows="10"  onChange={handle} required></textarea>
    
  </div>
  <div className="mb-3">
   
    <input type="date" className="form-control" id="exampleInputPassword2" name="auth_date"  value={formvalue.date}  onChange={handle} required/>
    </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}
