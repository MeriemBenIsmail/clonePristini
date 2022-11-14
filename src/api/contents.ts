import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const contentsApi=createApi({
  reducerPath:'contentsApi',
  baseQuery:fetchBaseQuery({baseUrl:process.env.API}),
  endpoints:builder=>({
    getContents:builder.query<any,any>({query:(params)=>({url:`${params.culture}/${params?.max? params.max:24}/${params?.page? params.page:1}/articles`+(params?.id? `/${params.id}`:'')})}),
    getContent:builder.query<any,any>({query:(params)=>({url:`${params.culture}/article/${params.id}`})})
  })
})

export const {useGetContentsQuery,useGetContentQuery}=contentsApi