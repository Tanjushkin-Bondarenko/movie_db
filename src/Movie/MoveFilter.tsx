import  FilterOutlinedIcon  from '@mui/icons-material/FilterOutlined';
import { Autocomplete, Checkbox, Button, debounce, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Skeleton, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {  KeywordItem, useGetGenresQuery, useGetKeywordsQuery } from '../services/tmdb';



export interface Filters{
    genres: number[];
    keywords: KeywordItem[]
}
interface MoviesFilter{
    onApply(filters: Filters): void}

export const MovieFilter = ({onApply}: MoviesFilter) => {

    const {control, handleSubmit, formState} = useForm<Filters>({
        defaultValues: {
            keywords: [],
            genres: []
        },
    });
        
    const [keywordsQuery, setKeywordsQuery] = useState<string>("");

    const {data: keywordsOptions =[], isLoading: keywordsLoading} = useGetKeywordsQuery(keywordsQuery, {skip: !keywordsQuery});
    const {data: genres, isLoading: genresLoading} = useGetGenresQuery();
   

const debounceFetchQueryOptions = useMemo(()=> debounce((query: string) => {
     setKeywordsQuery(query)
},1000 ),[]);
return(
    <Paper sx={{m: 2, p: 0.5}}>
        <form onSubmit={handleSubmit(onApply)}>
            <FormControl component='fieldset' variant="standard" sx={{m:2, display:"block"}}> 
               <Controller 
               name='keywords'
               control={control}
               render={({field:{onChange, value}}) => (
                <Autocomplete
                   multiple
                   disablePortal
                   loading={keywordsLoading}
                   options={keywordsOptions}
                   filterOptions={(x) => x}
                   getOptionLabel={(option) => option.name}
                   onChange={(_, value) => onChange(value)}
                   value={value}
                   isOptionEqualToValue={(option, value) => option.id === value.id}
                   onInputChange={(_, value) => debounceFetchQueryOptions(value)} 
                   renderInput={(params) => <TextField {...params} label='keywords' />}
                   />)} />
                </FormControl>

                <FormControl sx={{m: 2, display:"block"}} component="fieldset" variant="standard">
                {genresLoading ? (
                    <Skeleton height={480} width={380} />
           ) : (
           <>
           <FormLabel component="legend">Genres:</FormLabel>
           <FormGroup sx={{maxHeight: 500}}>
            <Controller 
            name='genres'
            control={control}
            render={({field}) => (
                <>
                {genres?.map((genre) => (
                     <FormControlLabel
                      key={genre.id}
                      control={
                        <Checkbox 
                        value={genre.id}
                        checked={field.value.includes(genre.id)}
                        onChange={(event, checked) => {
                            const valueNumber = Number(event.target.value);
                            if(checked){
                                field.onChange([...field.value, valueNumber])
                            }else{
                                field.onChange(field.value.filter((value) => value !== valueNumber))
                            }
                        }}
                        />
                      }
                     label={genre.name}
                     />
                      ))}
                </>
            )}
            />
           </FormGroup>
           </>
        )} 
           </FormControl>
              
           <Button type="submit" variant='contained' startIcon={<FilterOutlinedIcon/>}  sx={{m:2}} disabled={!formState.isDirty}>
                    Apply filter
                </Button>
        </form>
        

    </Paper>
);
}