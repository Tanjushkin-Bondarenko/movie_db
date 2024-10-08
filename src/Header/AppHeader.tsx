import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import LiveTvOutlinedIcon  from "@mui/icons-material/LiveTvOutlined";
import { AuthSection } from "./AuthSection";
import { useAuth0 } from "@auth0/auth0-react";


function HeaderLink({
  children, 
    to
  } :{
   to: string,
   children: React.ReactNode,
  }){
   return <Link
    component={RouterLink}
     variant='button'
     color="inherit"
     sx={{my:1, mx: 1.5}}
      to={to}>{children}</Link>
  }

  
export const AppHeader = () =>{
  const{isAuthenticated} = useAuth0()
    return(
        <AppBar position="static">
          <Toolbar>
            <LiveTvOutlinedIcon sx={{mr: 2}}/>
              <Typography variant='h6' color='inherit' noWrap>The Movies </Typography>
              <Box sx={{flexGrow: 1}}>
              <nav>
                <HeaderLink to="/">Home</HeaderLink>
                <HeaderLink to="/movie">Movies</HeaderLink>
                <HeaderLink to="/about">About</HeaderLink>
              </nav>
              </Box>
              <AuthSection/>
          </Toolbar>
        </AppBar>
    )
}

