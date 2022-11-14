import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const blocksApi=createApi({
  reducerPath:'blocksApi',
  baseQuery:fetchBaseQuery({baseUrl:process.env.API}),
  endpoints:builder=>({
    getBlocks:builder.query<any,any>({query:(params)=>({url:`${params.culture}/blocks`})}),
    getBlock:builder.query<any,any>({query:(params)=>({url:`${params.culture}/block/${params.id}`})})
  })
})

export const {useGetBlocksQuery,useGetBlockQuery}=blocksApi