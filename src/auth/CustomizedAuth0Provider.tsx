import { AppState, Auth0Provider } from "@auth0/auth0-react"
import config from "../configuration"
import { useNavigate } from "react-router-dom"

interface CustomizedAuth0Props{ 
    children: React.ReactNode
}
const authConfiguration = {
    domain: config.auth0Domain!,
    clientId: config.auth0ClientId!,
    authorizationParams: {
        redirect: config.auth0CallbackUrl,
    }
}
export function CustomizedAuth0Provider({ children }: CustomizedAuth0Props ){
   const navigate =  useNavigate()
    function onRedirectCallback(appState?: AppState){
        navigate(appState?.returnTo || window.location.pathname)
    }

    return (
    <Auth0Provider {...authConfiguration} cacheLocation="localstorage" onRedirectCallback={onRedirectCallback}>
        {children}
        </Auth0Provider>
    )
}