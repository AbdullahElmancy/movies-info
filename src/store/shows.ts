import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const showsApi = createApi({
    reducerPath:"showsapi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder)=>{
      return{
        getMovie: builder.query({
            query: (query) => `${query}?api_key=8fa694e68639fe9476d2540a7357fded`,
          }),
      }
      
    }
})

export const { useGetMovieQuery } = showsApi


