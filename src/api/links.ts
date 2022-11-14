import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const linksApi = createApi({
  reducerPath: 'linksApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API }),
  endpoints: builder => ({
    getLinks: builder.query<any, any>({query: (params) => ({ url:`${params?.culture? params.culture : process.env.defaultLocale}/menus/${params?.id? params.id : 1}/links` })})
  })
})

export const { useGetLinksQuery } = linksApi