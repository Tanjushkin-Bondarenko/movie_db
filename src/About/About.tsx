import { Container } from "@mui/material"
import { CountText } from "./CountText"
import { AboutVideo } from "./AboutVideo"
import { MapView } from "./MapView"

export const About = ()=>{
    return(
        <Container>
            <CountText/>
            <AboutVideo/>
            <MapView/>
        </Container>
    )
}