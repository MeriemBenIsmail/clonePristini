import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const diplomasApi=createApi({
  reducerPath:'diplomasApi',
  baseQuery:fetchBaseQuery({baseUrl:process.env.API}),
  endpoints:builder=>({
    getDiplomas:builder.query<any,any>({query:(params)=>({url:`${params.culture}/diplomas`})}),
    getDiploma:builder.query<any,any>({query:(params)=>({url:`${params.culture}/diploma/${params.id}/`})})
  })
})

export const {useGetDiplomasQuery,useGetDiplomaQuery} = diplomasApi