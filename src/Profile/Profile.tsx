import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";

 export const Profile = ()=>{

    const {user} = useAuth0();

    return (
        <Container>
            <Stack>
                <Box>
                    <Avatar>{user?.picture}</Avatar>
                    <Box>
                        <Typography variant = "h6">{user?.name}</Typography>
                        <Typography>{user?.email}</Typography>
                    </Box>
                </Box>
            </Stack>
        </Container>
    )
}