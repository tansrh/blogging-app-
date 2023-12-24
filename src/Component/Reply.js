import React,{useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Usercontext from '../context/Usercontext'; 
export default function Reply() {
    const navigate=useNavigate();
    const {user}=useContext(Usercontext);
    const {comments}=useContext(Usercontext);
    const {replyind}=useContext(Usercontext);
    const {replypar, setreplypar}=useContext(Usercontext);
    const {countt, setcountt}=useContext(Usercontext);
    const [cmnt, setcmnt]=useState(comments);
    const {msg,setmsg}=useContext(Usercontext);
    const handlesubmmit=async(e)=>{
       
        e.preventDefault();
        const formdata={email:user, bid:replyind, comment:cmnt, timenow:Date.now(), parent:replypar};
        const res=await axios.post("http://slim/api/comments/addp", formdata);
        const formd={comment:replypar, count:countt};
        console.log(formd);
                const r=await axios.put("http://slim/api/commentss/update", formd);
                navigate('/view/'+replyind);
    }
        /*
        const reqdata=await fetch("http://slim/api/commentsg/"+replyind+"/"+formdata.timenow);

                const resdata=await reqdata.json();
                //console.log(resdata);
  
                const getter=resdata.id;
        const adder={comment:getter, count:0};
        //console.log(adder+"adders");
        const newpush=await axios.post("http://slim/api/commentss/add", adder);
        try{
if(replypar!=0){
const formd={comment:replypar, count:countt};
                const r=await axios.put("http://slim/api/commentss/update", formd);




}
        }

        finally{

      
        setreplypar(0);
        setcountt(0);


        setmsg("Reply added");
      setTimeout(()=>{setmsg(null);}, 3000);
      navigate('/view/'+replyind);
       
        }
        
        const id={replyind};

       
        const fn=async(formdata)=>{
          console.log('fn');
          console.log(`http://slim/api/commentsg/${id}/${formdata.timenow}`);
          const reqdata=await fetch(`http://slim/api/commentsg/${id}/${formdata.timenow}`);
        const resdata=await reqdata.json()
        const g=async(e)=>{
          let getter=e.id;
             

             


              const adder={comment:getter, count:0};
              console.log("ADD"+adder);
              const newpush=await axios.post("http://slim/api/commentss/add", adder);
              setmsg("Comment added");
              setTimeout(()=>{setmsg(null);
              
              }, 3000);
        }
        resdata.map((e)=>{
     
            (e.timenow==formdata.timenow)?(
              
              g(e)


            ):console.log("No");
              
            
        })




      }
      fn(formdata);
        navigate('/view/'+replyind);
        }
        const handle=(e)=>{
            setcmnt(e.target.value);
        }
   //     //console.log(comments+"Her");




   */
   const handle=(e)=>{
    setcmnt(e.target.value);
}





  return (
    <div className='p-5'>
    <div className='m-3 p-3'>
    <form style={{width:"80%", margin:"auto"}} onSubmit={handlesubmmit}>
    
    
      <textarea style={{width:"100%"}} rows="10" class="form-control" value={cmnt} id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={handle}><b>{comments+": "}</b></textarea>
    
    
    <button type="submit" class="btn btn-primary m-2" >Add Reply</button>
  </form>
  </div>
  </div>
  )
}
