import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import  config  from "../configuration";


interface Configuration{
    images: {
        base_url: string
    }
}
interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    popularity: number;
    backdrop_path?: string;

}
interface MovieState {
    results: MovieDetails[];
    lastPage: number;
    hasMorePages: boolean
} 
export interface MoviesFilters{
    keywords?: number[],
    genres?: number[],
}
export interface MoviesQuery {
    page: number;
     filters: MoviesFilters;
} 
export interface KeywordItem{
    id: number,
    name: string,
}

interface PageResponse<TResults>{
    results: TResults[],
    page: number,
    total_pages: number,
}
interface Genre{
 id: number, 
 name: string
}

export const tmdbAPI = createApi({
    reducerPath: "tmdbAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${config.apiUrl}/3`,
        prepareHeaders(headers){
            headers.set("Accept", "application/json");
            headers.set("Authorization",`Bearer ${config.apiToken}`);
        }
    }),
    endpoints: builder => ({
        getConfiguration: builder.query<Configuration, void>({
            query: () => "/configuration"
        }),
        getMovies: builder.query<MovieState, MoviesQuery>({
            query(MoviesQuery){
                const params = new URLSearchParams({
                    page: MoviesQuery.page.toString()
            })
            if(MoviesQuery.filters.keywords?.length){
                params.append("with_keywords", MoviesQuery.filters.keywords.join("|"))
            }   
            if(MoviesQuery.filters.genres?.length){
                params.append("with_genres", MoviesQuery.filters.genres.join(", "))
            }
                const query = params.toString()
                const path = `/discover/movie?${query}`  
                return path;
                },
                transformResponse(response: PageResponse<MovieDetails>, _, arg){
                    return {
                        results: response.results,
                        lastPage: response.page,
                        hasMorePages: arg.page < response.total_pages,  
                    };
                },
                serializeQueryArgs({endpointName}){
                    return endpointName
                },
                merge(currentCacheData, responseData){
                    if(currentCacheData.lastPage ===1){
                        currentCacheData.results =responseData.results
                    }else{
                        currentCacheData.results.push(...responseData.results)
                    }
                    currentCacheData.lastPage = responseData.lastPage;
                    currentCacheData.hasMorePages = responseData.hasMorePages;
                },
                forceRefetch({currentArg, previousArg}) {
                    return currentArg !== previousArg
                },

            }),
        getKeywords:builder.query<KeywordItem[], string>({
             query: (queryText) => `/search/keyword?query=${queryText}`,
             transformResponse: (response: PageResponse<KeywordItem>) => response.results,
             
            }),
        getGenres: builder.query<Genre[], void>({
            query: () => "genre/movie/list",
            transformResponse: (response: {genres: Genre[]})=> response.genres
        })    
          
       
    }),
})

export const {useGetConfigurationQuery, 
    useGetMoviesQuery, 
    useGetKeywordsQuery,
    useGetGenresQuery} = tmdbAPI




