import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";



export const CountText = () => {
    const [countDown, SetCountDown] = useState(9)
    const intervalRef = useRef<any>()
    useEffect(() => {
         intervalRef.current = setInterval(()=>{
            SetCountDown((value)=> value -1)
        }, 1000);

        clearInterval(intervalRef.current)
    },[])
    
    useEffect(()=>{
        if(countDown === 0){
        clearInterval(intervalRef.current)}
    }, [countDown])
    
  return(
    <Typography>Coming soon {countDown}</Typography>
  )
}