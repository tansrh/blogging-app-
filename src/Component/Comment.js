import React,{useState,useEffect, useContext} from 'react'
import Usercontext from '../context/Usercontext'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Comment(props) {
    const [edit, setedit]=useState(Date.now()-props.obj.timenow);
    const [cmnt, setcmnt]=useState(props.obj.Comment);
    const {replypar, setreplypar}=useContext(Usercontext);

  //console.log(props.obj);



    const {user}=useContext(Usercontext);
    const {setcomments}=useContext(Usercontext);
    const {setreplyind}=useContext(Usercontext);
    const {msg,setmsg}=useContext(Usercontext);
    const {del,setdel}=useContext(Usercontext);
    const [votea, setvotea]=useState(false);
    const [voteb, setvoteb]=useState(false);
    const [recall, setrecall]=useState(false);
    const [upvotes, setupvotes]=useState(props.obj.upvotes);
    const [downvotes, setdownvotes]=useState(props.obj.downvotes);
    const [reports, setreports]=useState(props.obj.reports);
    const {countt, setcountt}=useContext(Usercontext);
    const [rep, setrep]=useState(false);
    const [ind, setind]=useState(-1);
    const {mod}=useContext(Usercontext);
    const navigate=useNavigate();
    const handle=(e)=>{
        setcmnt(e.target.value);
    }
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setedit(300000);
      }, 300000-edit);
      return () => clearTimeout(timer)
    }, [edit]);


   

    
    const save=async(e, id)=>{
      e.preventDefault();
                ////console.log(formvalue);
                const formdata={comment:cmnt};
                const res=await axios.put("http://slim/api/comments/update/"+id, formdata);
               //console.log(formdata+id);
               setmsg("Comment saved");
               setTimeout(()=>{setmsg(null);}, 3000);

    }
    const handlereply=async(e)=>{
      e.preventDefault();
      let vx="[ Replying to: " + props.obj.email+ " => "+ props.obj.comment+" ]";
      
      setcomments(vx);
      if(props.obj.parent==0){
        setreplypar(props.obj.id);
      }
      else{
        setreplypar(props.obj.parent);
      }
      console.log(replypar);
      const enq=await fetch("http://slim/api/commentss/"+replypar);
      const resenq=await enq.json();
      console.log(resenq);
     
        resenq.map((rr)=>{
          if(rr.count>=50){
            setmsg("Reply limit exceed for the comment.")
            setTimeout(()=>{
              setmsg(null);
            }, 3000)
          }
          else{
            setreplyind(props.obj.bid);
            setcountt(rr.count+1);
            navigate('/reply');
            
          }
        })
     
     
     

      
    }
   
    const upvote=(e)=>{
      e.preventDefault();
   
        
        
      getupvotes();
     
      
    }
    const downvote=(e)=>{
      e.preventDefault();
  
       
      
      getdownvotes();
     
     
    }
    const getdownvotes=async()=>{
      const reqdata=await fetch("http://slim/api/comments/downvotes/"+props.obj.id);
      const resdata=await reqdata.json();
      
     console.log(resdata[0].downvotes +" down");
     console.log(resdata[0]);
  
        setdownvotes(resdata[0].downvotes);
      
      
      
  const newreq=await fetch("http://slim/api/commentrecords/"+props.obj.id+"/"+user);
  const newdata=await newreq.json();
  if(newdata.length>0){
  let formdataa={email:user, upvote:(newdata[0].upvote), downvote:(newdata[0].downvote), id:props.obj.id};
  console.log(newdata[0]);
  if(newdata.length>0){

newdata.map((e)=>{
  

  if(e.upvote==0 && e.downvote==0){

    const formdata={downvotes:(downvotes+1)};
    setdownvotes(downvotes+1);
     formdataa={email:user, upvote:0, downvote:1, id:props.obj.id};
     const res= axios.put("http://slim/api/comments/update/downvotes/"+props.obj.id, formdata);
   // const updt=await axios.put("http://slim/api/commentrecords/update", formdata);


  }
  else if(e.upvote==0){
    
    const formdata={downvotes:(downvotes-1)};
    setdownvotes(downvotes-1);
    const res= axios.put("http://slim/api/comments/update/downvotes/"+props.obj.id, formdata);
     formdataa={email:user, upvote:0, downvote:0, id:props.obj.id};

  }
 

})
  }

  const updt=await axios.put("http://slim/api/commentrecords/update", formdataa);
  
}
      
    /*
  const formdata={downvotes:downvotes};
  const res=await axios.put("http://slim/api/comments/update/downvotes/"+props.obj.id, formdata);
               
               */

if(newdata.length==0){

  let formdataa={email:user, upvote:0, downvote:1, id:props.obj.id};
  const updt=await axios.post("http://slim/api/commentrecords/add", formdataa);
  const formdata={downvotes:(downvotes+1)};
  setdownvotes(downvotes+1);
  const res= axios.put("http://slim/api/comments/update/downvotes/"+props.obj.id, formdata);
  

}


               setmsg("Downvotes updated");
               setTimeout(()=>{setmsg(null);}, 3000);
      
     
      }
      const getupvotes=async()=>{
        const reqdata=await fetch("http://slim/api/comments/upvotes/"+props.obj.id);
        const resdata=await reqdata.json();
       // setvotea(false);
     //   setvoteb(false);
        
        //setcom(resdata);
       
        
          setupvotes(resdata[0].upvotes);
       
        console.log("http://slim/api/commentrecords/"+props.obj.id+"/"+user);

        const newreq=await fetch("http://slim/api/commentrecords/"+props.obj.id+"/"+user);
        const newdata=await newreq.json();
        const newmodreq=await fetch("http://slim/api/moderator/"+props.obj.email);
        const newmoddata=await newmodreq.json();
        console.log(newmoddata);
        if(newdata.length>0){
        console.log(newdata[0]);
        let formdataa={email:user, upvote:(newdata[0].upvote), downvote:(newdata[0].downvote), id:props.obj.id};
        console.log(props.obj.email);
       
        
        
        
        if(newdata.length>0){
      
      newdata.map((e)=>{
       
      if(e.upvote==0 && e.downvote==0){
        const formdata={upvotes:(upvotes+1)};

        setupvotes(upvotes+1);
         formdataa={email:user, upvote:1, downvote:0, id:props.obj.id};
        
      //  const updt= axios.put("http://slim/api/commentrecords/update", formdata);
        const res= axios.put("http://slim/api/comments/update/upvotes/"+props.obj.id, formdata);


          if(newmoddata.length==0){
         const formmoddata={email:props.obj.email,upvote:upvotes};
      
        console.log("first"+formmoddata);
          const updt= axios.post("http://slim/api/moderator/add", formmoddata);
          }
          else{
            const formmoddata={email:props.obj.email, upvote:(newmoddata[0].upvote+1)};  
        
          const updt= axios.put("http://slim/api/moderator/update", formmoddata);
          }

      }
      else if(e.downvote==0){
       
        const formdata={upvotes:(upvotes-1)};
        setupvotes(upvotes-1);
        const res= axios.put("http://slim/api/comments/update/upvotes/"+props.obj.id, formdata);
         formdataa={email:user, upvote:0, downvote:0, id:props.obj.id};

        if(newmoddata.length>0){
         const formmoddata={email:props.obj.email, upvote:(newmoddata[0].upvote-1)};
      
        
         const updt= axios.put("http://slim/api/moderator/update", formmoddata);
        }

      }
      
      })
      
      
        }
      
        /*
        const formdata={upvotes:upvotes};
       
        const res=await axios.put("http://slim/api/comments/update/upvotes/"+props.obj.id, formdata);
       */
        const updt=await axios.put("http://slim/api/commentrecords/update", formdataa);

      }
        if(newdata.length==0){
         let  formdataa={email:user, upvote:1, downvote:0, id:props.obj.id};
         const formdata={upvotes:1};
         setupvotes(1);
         const res= await axios.put("http://slim/api/comments/update/upvotes/"+props.obj.id, formdata);
          const updt=await axios.post("http://slim/api/commentrecords/add", formdataa);

          if(newmoddata.length==0){
            const formmoddata={email:props.obj.email,upvote:upvotes};
         
           console.log("first"+formmoddata);
             const updt= axios.post("http://slim/api/moderator/add", formmoddata);
             }
             else{
               const formmoddata={email:props.obj.email, upvote:(newmoddata[0].upvote+1)};  
           
             const updt= axios.put("http://slim/api/moderator/update", formmoddata);
             }
          
        
        }



        setmsg("Upvotes updated");
        setTimeout(()=>{setmsg(null);}, 3000);

        
        }
        const getreports=async()=>{
          const reqdata=await fetch("http://slim/api/comments/reports/"+props.obj.id);
          const resdata=await reqdata.json();
          
        
          
          setreports(resdata[0].reports);

          



          const newreq=await fetch("http://slim/api/commentrecords/"+props.obj.id+"/"+user);
        const newdata=await newreq.json();
        if(newdata.length>0){
        let formdata={report:newdata[0].report, email:user, id:props.obj.id};
        
        console.log(newdata.length + "k");
        if(newdata.length>0){
      
      newdata.map((e)=>{
        console.log(e+"ee")
       setrep(e.report==1);
      
      })
      
      
        }
       
          if(newdata[0].report==0){
            setrep(!rep);
            formdata.report=1;
            
            const fd={reports:(reports+1)};
            setreports(reports+1);
          axios.put("http://slim/api/comments/update/reports/"+props.obj.id, fd);
        }
        else{
          setrep(!rep);
          formdata.report=0;
          
          const fd={reports:(reports-1)};
          setreports(reports-1);
          axios.put("http://slim/api/comments/update/reports/"+props.obj.id, fd);
        }
        console.log("update:"+reports+" "+props.obj.id);  
        const updt=await axios.put("http://slim/api/commentrecords/update/rep", formdata);

      }
        if(newdata.length==0){
          let formdata={report:1, email:user, id:props.obj.id};
         
          
          const fd={reports:(reports+1)};
          setreports(reports+1);
          axios.put("http://slim/api/comments/update/reports/"+props.obj.id, fd);
          const updt=await axios.post("http://slim/api/commentrecords/add/rep", formdata);
          
        
        }



    //      const formdata={reports:reports};
      //         const res=await axios.put("http://slim/api/comments/update/reports/"+props.obj.id, formdata);
               
               setmsg("Reports updated");
               setTimeout(()=>{setmsg(null);}, 3000);
          }
     
     const handledelete=async(e)=>{
      e.preventDefault();
      let k=("This comment has been deleted.");
      if(mod==true && user!=props.obj.email){
        k=("This comment was deleted by a moderator.");
      }
      const formdata={comment:k};
      const res=await axios.put("http://slim/api/comments/update/"+props.obj.id, formdata);
      props.obj.comment=k;
      setdel(del+1);
      setmsg("Comment deleted");
      setTimeout(()=>{setmsg(null);}, 3000);
     }
     const handlereport=async(e)=>{
      e.preventDefault();
      getreports();
      
     }
     
     
     (props.obj.reports>=5)?props.obj.comment="This comment is hidden because of spam.":props.obj.comment=props.obj.comment;
     //console.log(props.obj);
     return (
    <div className='p-1'>
    <div key={recall} className=' m-2 flex flex-column  ' style={{width:"100%"}}>
       
       
    {
      

       
         <div  className='flex  p-3 justify-content-start'>
          <b>
          By User: {props.obj.email}
          </b>

      

        
  


          {

         ((edit<300000 && user && user==props.obj.email && props.obj.comment!="This comment has been deleted." && props.obj.comment!="This comment is hidden because of spam."  && props.obj.comment!= "This comment was deleted by a moderator.") || (mod==true  && props.obj.comment!="This comment has been deleted."   && props.obj.comment!= "This comment was deleted by a moderator."  && props.obj.comment!="This comment is hidden because of spam."))?(<textarea style={{width:"100%"}}  value={cmnt} onChange={handle}>{props.obj.comment}</textarea>):(<div style={{width:"100%"}} className='border border-secondary p-2 '>{props.obj.comment}</div>)
        // (user)?(<button type="button" class="btn btn-primary m-1">Reply</button>):<></>
         //(user && user==props.obj.email)?(<button type="button" class="btn btn-primary">Delete</button>):<></>
         
          }
          {

            (user   && props.obj.comment!= "This comment was deleted by a moderator." &&  props.obj.comment!="This comment is hidden because of spam." &&  props.obj.comment!="This comment has been deleted.")?(<div className='flex '>
                {


              (user!=props.obj.email )?<div className='flex '><button type="button" class="btn btn-success m-1" onClick={handlereply}>Reply</button><button type="button" class="btn btn-primary m-1" onClick={upvote}>Upvote</button><input type='text' readonly value={upvotes}></input><button type="button" class="btn btn-warning m-1"  onClick={downvote}>Downvote</button><input type="text" readonly value={downvotes}></input><button type="button" class="btn btn-success m-1" onClick={handlereport}>Report</button><input type='text' readonly value={reports}></input></div>:<></>
          }
            {
              ((user==props.obj.email || mod==true) )?<button type="button" class="btn btn-danger m-1"  onClick={(e)=>handledelete(e)}>Delete</button>:<></>
            }
            {
              (((edit<300000 && user==props.obj.email) || (mod==true)))?<button type="button" class="btn btn-dark m-1" onClick={(e)=>save(e, props.obj.id)}>Save</button>:<></>
            }



          </div>):<></>
          }
        
          </div>
         
    }

    </div>
    </div>
  )
}
