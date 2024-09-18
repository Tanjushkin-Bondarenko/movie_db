import {withAuthenticationRequired} from "@auth0/auth0-react"
import { LinearProgress } from "@mui/material"

interface AuthenticationGaurdProps{
    component: React.ComponentType
}
export const AuthenticationGaurd = ({component}: AuthenticationGaurdProps) =>{
   const Component  = withAuthenticationRequired(component,{
    onRedirecting: () => <LinearProgress/>
   })
   return <Component/>
}
