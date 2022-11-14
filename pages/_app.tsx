import {DefaultSeo} from 'next-seo'
import {Provider} from 'react-redux'
import {CacheProvider} from '@emotion/react'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import store from '../src/store'
import SEO from '../src/seo/config'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/styles/theme'
import '../src/styles/globals.css'

declare global {interface Window{gtag?:any}}
const clientSideEmotionCache=createEmotionCache()

function MyApp({emotionCache=clientSideEmotionCache,Component,pageProps}:any) {
  return <Provider store={store}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  </Provider>
}

export default MyApp