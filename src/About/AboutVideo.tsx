import { Card, CardActions, CardMedia, IconButton, useScrollTrigger } from "@mui/material"
import { useRef, useState } from "react";
import PauseIcon from "@mui/icons-material/PlayArrow";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";


export const AboutVideo = ()=>{
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    function toglePlaying(){
        const nextPlaying = !isPlaying
        if(nextPlaying){
            videoRef.current?.play()
        }else{
            videoRef.current?.pause()
        }
    }

    return(
        <Card>
            <CardMedia>
            <video
            ref={videoRef}
            src="https://www.pexels.com/download/video/3843433"
            height={500}
            onPlay={()=> setIsPlaying(true)}
            onPause={()=> setIsPlaying(false)}
            />
            <CardActions>
                <IconButton onClick={toglePlaying}>
                    {isPlaying ?
                    <PauseIcon sx={{height:38, width: 58 }}></PauseIcon> : 
                    <PlayArrowIcon sx={{Height: 38, width: 58}}></PlayArrowIcon>
                }
                </IconButton>
            </CardActions>
            </CardMedia>
        </Card>
    )

} 