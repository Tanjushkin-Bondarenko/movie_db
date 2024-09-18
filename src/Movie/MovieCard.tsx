import { Button, Card, CardActions, CardContent, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { memo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";



interface Props{
    id: number,
    title: string,
    overview: string,
    popularity: number,
     enableUserAction?: boolean,
     addFavorite?(id: number): void,
     images?: string
}


function MovieCard({
    id,
    title,
    overview,
    popularity,
     enableUserAction = false,
     addFavorite,
     images = "/public/popconandcinema.jpg"
}:Props){
   return(
    <Card sx={{height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{flexGrow: 1}}>
          <Card>
            <CardMedia component="div" image={images} sx={{pt: "56.25%"}}/>
        

            <Typography variant="h5" gutterBottom>{title}</Typography>
            <Typography variant="body2" color='text.secondary' >{overview}</Typography>
            <Typography variant="button" display="block" mt={2}>{popularity}</Typography>
          </Card>
          <CardActions>
            <Button component={RouterLink} to={`/movies/${id}`} color="secondary">Details</Button>
            </CardActions>
            {
                enableUserAction && (<Tooltip title="add to favorite" >
                    <IconButton onClick={()=> addFavorite?.(id)}>
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>)
            }
        </CardContent>

    </Card>    
   )}

export default memo(MovieCard)