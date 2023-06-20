import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
export const useAuthtatus=()=>{
    const [loggedin,setloggedin]=useState(false)
    const [checkignstatus,setcheckingstatus]=useState(true)
    const {user}=useSelector((state)=>state.auth)
    useEffect(()=>{
        if(user){
            setloggedin(true)

        }
        else{
            setloggedin(false)
        }
        setcheckingstatus(false)

    },[user])
    return {loggedin,checkignstatus}
}