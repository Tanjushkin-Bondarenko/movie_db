import { Box, Container, Stack, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';


const CopyRight = () => {
    return(
        <Typography >
            Copyright The Movie DB{new Date().getFullYear()}
        </Typography>
    )
}
export const Home = () => {
    const {user, isAuthenticated } = useAuth0()
 
     const greeting = isAuthenticated ?
     `${user?.name}, explore movies today with us` :
     "Explore movies today with us"
    

    return(
        <Box sx={{bgColor: "background.paper", pt: 8, pb: 8}}>
    <Container maxWidth="sm">
    <Typography
             component="h1"
            variant="h2"
            align="center"
            color='text.primary'
            gutterBottom
            >Welcome</Typography>
    <Typography
            variant="h5"
            color="text.secondary"
            align="center"
            paragraph>
             {greeting}
    </Typography>
    <Stack
            sx={{pt: 4}}
            direction="row"
            spacing={2}
            justifyContent="center"
            >
        <Button 
                component={RouterLink}
                to="/movies"
                variant="contained"
                color="secondary">
                 Explore
        </Button>
    </Stack>
    </Container>
    <Container
            component="footer"
            maxWidth= "md"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8, 
                py: [3, 6]
            }}>
    <CopyRight/>
    </Container>
    </Box>
        
    )
}