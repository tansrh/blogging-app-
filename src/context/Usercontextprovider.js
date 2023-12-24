import React, { useState } from "react";
import Usercontext from "./Usercontext";
const Usercontextprovider=({children})=>{
    const [user, setuser]=useState(null);
    const [comments, setcomments]=useState(null);
    const [replyind, setreplyind]=useState(null);
    const [replypar, setreplypar]=useState(0);
    const [countt, setcountt]=useState(0);
    const [mod, setmod]=useState(false);
    const [msg, setmsg]=useState(null);
    const [del, setdel]=useState(null);

    return (
   
<Usercontext.Provider value={{user, setuser, comments, setcomments, replyind, setreplyind, del, setdel, msg, setmsg, replypar, setreplypar,countt, setcountt, mod, setmod}}>

{children}
</Usercontext.Provider>
    )
}
export default Usercontextprovider;