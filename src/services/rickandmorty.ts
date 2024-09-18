import { createApi } from "@reduxjs/toolkit/query/react"
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import config from "../configuration"
import { gql } from 'graphql-request'

export interface EpoisodesState{
    results: Episode[],
}
export interface EpisodeQuery{
    page: number
}
interface EpisodResponse{
    episodes: {
        results: Episode[]
    }
}
export interface Episode{
    name: string,
    air_date: number,
    episode: string,
    characters: Character[],
}
export interface Character{
    id:number,
    name:string,
    image:string,
}
export const rickAndMortyApi = createApi({
    reducerPath: "rickAndMortyApi",
    baseQuery: graphqlRequestBaseQuery({
     url: `${config.rickAndMortyUrl}`
    }),
    endpoints: (builder) =>({
        getEpisods: builder.query<EpoisodesState, EpisodeQuery>({
            query({page}){
                return {
                    document: gql`
                    query GetEpisodePage($page: Int){
                     episodes(page: $page){
                       results{
                       name
                       air_date
                       episode
                       characters{
                          id
                          name
                          image
                          }
                       }
                     }
                    }`,
                    variables: {
                        page
                    }
                }
            },
            transformResponse(response: EpisodResponse){
              return {results: response.episodes.results}
            }
        })
    })
})

export const {useGetEpisodsQuery} = rickAndMortyApi