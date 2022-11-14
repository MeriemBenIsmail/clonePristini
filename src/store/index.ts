import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {countriesApi} from '../api/countries'
import {linksApi} from '../api/links'
import {blocksApi} from '../api/blocks'
import {pagesApi} from '../api/pages'
import {contentsApi} from '../api/contents'
import {diplomasApi} from '../api/diplomas'
import {programsApi} from '../api/programs'

export const store=configureStore({
  reducer:{[countriesApi.reducerPath]:countriesApi.reducer,[linksApi.reducerPath]:linksApi.reducer,[blocksApi.reducerPath]:blocksApi.reducer,[pagesApi.reducerPath]:pagesApi.reducer,[contentsApi.reducerPath]:contentsApi.reducer,[diplomasApi.reducerPath]:diplomasApi.reducer,[programsApi.reducerPath]:programsApi.reducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(countriesApi.middleware).concat(linksApi.middleware).concat(blocksApi.middleware).concat(pagesApi.middleware).concat(contentsApi.middleware).concat(diplomasApi.middleware).concat(programsApi.middleware)
})

setupListeners(store.dispatch)

export default store