import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function AuthSection(){
    const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0();
    const navigate = useNavigate()
   const onLogIn = async () => {
   await loginWithRedirect({
    appState: {
      returnTo: "/"
    }

   })
   } 
   const onLogOut = () =>{
    logout({
      logoutParams:{
        returnTo: window.location.origin
      }
    }) 
   }
   

    return isAuthenticated && user ? ( <>
        <Typography>Hello {user?.name}</Typography>
        <Button color="inherit" variant="outlined" sx={{ml: 1.5}} onClick={onLogOut} 
        // onOpenProfile={()=> navigate("/profile")}
        >Log out</Button>
        </>
    ) :(
    <Button color="inherit" variant="outlined" onClick={onLogIn}>Log in</Button>)
}