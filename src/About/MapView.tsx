import { Box, Container, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Map } from 'leaflet';
import { createPortal } from 'react-dom';
import FavoriteIcon from "@mui/icons-material/Favorite"
import { createMapBlock, AddPopupToMap } from './MapBlock';

export const MapView = () =>{
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<Map | null>(null)
    
    const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(null)
 
    useEffect(()=>{
      if(mapRef.current === null){
      const map = createMapBlock(containerRef.current!);
      mapRef.current = map
      const popupElement = AddPopupToMap(map)
      
      setPopupContainer(popupElement)
      }
    }, [])
    return (
        <Container ref={containerRef} sx={{width: 800, height: 500, my: 2}}>
            {popupContainer !== null && createPortal(<Grettings/>, popupContainer)}
        </Container>
    )
}

const Grettings = () =>{
    return(
        <Box>
            <Typography>Hello from portal</Typography>
            <FavoriteIcon sx={{color: "#0056b9"}}></FavoriteIcon>
            <FavoriteIcon sx={{color: "#FFD800"}}></FavoriteIcon>
        </Box>
    )
}