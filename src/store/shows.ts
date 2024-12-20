import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const showsApi = createApi({
    reducerPath:"showsapi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder)=>{
      return{
        getMovie: builder.query({
            query: (query) => `${query}?api_key=${process.env.APIKEY}`,
          }),
      }
      
    }
})

export const { useGetMovieQuery } = showsApi


