import React,{useState, useEffect, useContext}from 'react'
import { useParams } from 'react-router-dom';
import Usercontext from '../context/Usercontext'; 
import Comment from './Comment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function View(props) {
    const {id}=useParams();
    const [data, setdata]=useState([]);
    const [com, setcom]=useState([]);
    const {user}=useContext(Usercontext);
    const {del,setdel}=useContext(Usercontext);
    const {msg,setmsg}=useContext(Usercontext);
    const navigate=useNavigate();
    const [cmnt, setcmnt]=useState("");
    const getdata=async()=>{
        const reqdata=await fetch("http://slim/api/blog/"+id);
        const resdata=await reqdata.json();
        
        setdata(resdata);
        //console.log(data+"Here");
        }
        const getcom=async()=>{
          const reqdata=await fetch("http://slim/api/comments/"+id);
          const resdata=await reqdata.json();
          
          setcom(resdata);
          //console.log(com+"Here");
          }
          const handle=(e)=>{
            setcmnt(e.target.value);
        }

        useEffect(()=>{

            getdata();
            getcom();
              }, []);
              
              useEffect(()=>{

              }, [msg])
              
              const handlesubmmit=async(e)=>{
    
                e.preventDefault();
                

                
                //console.log(cmnt);
                console.log("chck");
                if(cmnt.length<=0){
                  setmsg("Please enter valid comment");
                  setTimeout(()=>(setmsg("")),3000);
                 
                }
                else{
                const formdata={email:user, bid:id, comment:cmnt, timenow:Date.now()};
                
                const res=await axios.post("http://slim/api/comments/add", formdata);
                fn(formdata);


              
                setcmnt("");
                getcom();
                }
                
                }

                const fn=async(formdata)=>{
                  console.log('fn');
                  console.log(`http://slim/api/commentsg/${id}/${formdata.timenow}`);
                  const reqdata=await fetch(`http://slim/api/commentsg/${id}/${formdata.timenow}`);

                //  const resdata=await reqdata.json();
                 
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
  /*
                  let getter;
                  resdata.map((e)=>{
                    getter=e.id;
                  })

                 
  
  
                  const adder={comment:getter, count:0};
                  console.log(adder);
                  const newpush=await axios.post("http://slim/api/commentss/add", adder);
                  setmsg("Comment added");
                  setTimeout(()=>{setmsg(null);
                  
                  }, 3000);
*/
                 
                }
            
  return (
    
   
    <div className='p-5'>
    <div className="card mx-auto my-5 p-3 flex flex-column flex-wrap border-primary align-items-center " style={{height : '100%',width : '80%', border: '1px solid black'}}>
   {data.map((udata, index) =>(
   // //console.log(udata)
    <div>
      <div>
  <img style={{height : '70%',width : '60%'}} src="https://imgs.search.brave.com/dNHjgXbP2JSl_7IxQjHiF0juNJD2G27ltPBCR1aevqM/rs:fit:560:320:1/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vdGh1bWIv/Ny83Yi9Db2RlY2hl/ZiUyOG5ldyUyOV9s/b2dvLnN2Zy81MTJw/eC1Db2RlY2hlZiUy/OG5ldyUyOV9sb2dv/LnN2Zy5wbmc" alt="Card image cap"/>
 
  </div>
  <div className="card-body flex-column flex-wrap">
    <h5 className="card-title"><b>{udata.title}</b></h5>
    <p className="card-text"><b>{"Date: "+udata.auth_date}</b></p>
    <div className="card-text">{udata.content}</div>
   
  </div>
  </div>
    ))
   }

   <h4>Comments: </h4>
   {
   // (user)?<form style={{width:'80%'}} className="m-5 mb-5 p-3 flex-column justify-content-center " onSubmit={handlesubmmit}><textarea placeholder='Add Comment' className='m-2' value={cmnt} onChange={handle}></textarea><button type="submit" className="btn m-2 btn-primary">Submit</button></form>:<></>
   
   
   
   
   (user)?(<form style={{width:"80%"}} onSubmit={handlesubmmit}>
    
    
      <textarea style={{width:"100%"}} class="form-control" value={cmnt} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Add comment" onChange={handle}></textarea>
    
    
    <button type="submit" class="btn btn-primary m-2" >Submit</button>
  </form>):<></>
   
   
   
   
   
   
   }
{
  com.map((udata) =>(
   
   <Comment obj={udata}/>

 
   ))
}

</div>
</div>

  )

}
