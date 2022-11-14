import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const countriesApi=createApi({
  reducerPath:'countriesApi',
  baseQuery:fetchBaseQuery({baseUrl:process.env.API}),
  endpoints:builder=>({
    getCountries:builder.query<any,any>({query:(params)=>({url:`${params.culture}/countries`})})
  })
})

export const {useGetCountriesQuery}=countriesApi