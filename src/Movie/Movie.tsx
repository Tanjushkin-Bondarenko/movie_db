import { Container, Grid, LinearProgress, Typography } from "@mui/material"
import  MovieCard  from "./MovieCard"
import {  useCallback,  useState } from "react"
import { useIntesectionObserver } from "../hooks/useIntersectionObserver"
import { MovieFilter } from './MoveFilter';
import {  MoviesQuery, useGetConfigurationQuery, useGetMoviesQuery } from '../services/tmdb';
import { useAuth0 } from "@auth0/auth0-react"

const initialQuery = {
    page: 1, 
    filters: {}
}

 const Movies=() => {
     const [query, setQuery] = useState<MoviesQuery>(initialQuery)
    
    const {data: configuration} = useGetConfigurationQuery();
    const {data, isFetching} = useGetMoviesQuery(query)
 
    const movies = data?.results ?? [];
    const hasMorePages = data?.hasMorePages; 

    function formatImageUrl(path?: string){
        return path && configuration ? `${configuration?.images.base_url}/w780${path}`: undefined
    }
    const onIntersect = useCallback(() =>{
        if(hasMorePages){
           setQuery(q => ({...q, page: q.page+1}))
        }
    }, [hasMorePages])
    const [targetRef] = useIntesectionObserver({onIntersect})
 
    const {user, isAuthenticated } = useAuth0();
     
    
    const addToFavorite = useCallback((id: number)=> {
        console.log(`${user?.name} add to favorite film ` )
        }, [user?.name])
    return(
        <Grid container spacing={2} sx={{flexWrap: "nowrap"}}>
               <Grid item xs= "auto" sx={{mt: 8}}>
                 <MovieFilter onApply={(filters) => {
                    const moviesFilters ={
                       keywords: filters?.keywords.map((k) => k.id),
                       genres: filters?.genres
                    }
                    setQuery({
                        page: 1,
                        filters: moviesFilters 
                    })}}/>
               </Grid>

               <Grid item xs={12} >
                 <Container sx={{py: 8}} maxWidth="lg">
                    {!isFetching && !movies.length &&(
                        <Typography variant="h6">No movies were found that mutch your query</Typography>
                    )}
                     <Grid container spacing={4}>
                    {movies.map( m => (
                        <Grid item key={m.id}xs={12} sm={8} md={4}>
                            <MovieCard
                                key={m.id}
                                id={m.id}
                                title={m.title}
                                overview={m.overview}
                                popularity={m.popularity}
                                enableUserAction={isAuthenticated}
                                addFavorite={addToFavorite} 
                                images={formatImageUrl(m.backdrop_path)}
                                />
                        </Grid>))}
                 </Grid>
                 <div ref={targetRef}> {isFetching && <LinearProgress/>} </div>
                 </Container>
               </Grid>
        </Grid>)}

export default Movies;