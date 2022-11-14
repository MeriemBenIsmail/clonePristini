import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const programsApi = createApi({
  reducerPath: 'programsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.API }),
  endpoints: builder => ({
    getPrograms: builder.query<any, any>({query: (params) => ({ url:`${params?.culture? params.culture : process.env.defaultLocale}/programs` })}),
    searchPrograms: builder.query<any, any>({query: (params) => ({ url:`${params?.culture? params.culture : process.env.defaultLocale}/programs/search/${params.tag}` })})
  })
})

export const { useGetProgramsQuery, useSearchProgramsQuery } = programsApi