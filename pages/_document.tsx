import Document,{Html,Head,Main,NextScript} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/styles/theme'

export default class MyDocument extends Document {
  render() {
    return <Html lang={this.props.locale}>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/front/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/front/apple-touch-icon.png" />
		    <link rel="icon" type="image/png" sizes="32x32" href="/front/favicon-32x32.png" />
		    <link rel="icon" type="image/png" sizes="16x16" href="/front/favicon-16x16.png" />
        <link rel="manifest" href="/front/site.webmanifest" />
        {(this.props as any).emotionStyleTags}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`} />
        <script dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js',new Date());
        gtag('config','${process.env.GTAG}',{page_path: window.location.pathname});`
        }} />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
    </Html>
  }
}

MyDocument.getInitialProps=async (ctx)=>{
  const originalRenderPage=ctx.renderPage;
  const cache=createEmotionCache();
  const { extractCriticalToChunks }=createEmotionServer(cache);
  ctx.renderPage=()=>originalRenderPage({enhanceApp: (App: any)=>function EnhanceApp(props) { return <App emotionCache={cache} {...props} />}});
  const initialProps=await Document.getInitialProps(ctx);
  const emotionStyles=extractCriticalToChunks(initialProps.html);
  const emotionStyleTags=emotionStyles.styles.map((style)=>(<style data-emotion={`${style.key} ${style.ids.join(' ')}`} key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} />));
  return {...initialProps,emotionStyleTags};
}