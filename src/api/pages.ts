import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const pagesApi=createApi({
  reducerPath:'pagesApi',
  baseQuery:fetchBaseQuery({baseUrl:process.env.API}),
  endpoints:builder=>({
    getPages:builder.query<any, any>({query:(params)=>({url:`${params.culture}/pages`})}),
    getPage:builder.query<any, any>({query:(params)=>({url:`${params.culture}/page/${params.id}`})})
  })
})

export const {useGetPagesQuery,useGetPageQuery}=pagesApi