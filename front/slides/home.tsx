import Dynamic from "next/dynamic"
import useTranslation from 'next-translate/useTranslation'

const Paper=Dynamic<any>(()=>import("@mui/material/Paper"), {ssr:false})
const Container=Dynamic<any>(()=>import("@mui/material/Container"),{ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})
//const Button=Dynamic<any>(()=>import("@mui/material/Button"),{ssr:false})

export default function Home() {
  const {t}=useTranslation('common')
  return <Paper variant='welcome'>
    <video className="videoBg" autoPlay loop muted><source src="/medias/welcome.mp4" /></video>
    <Container maxWidth={false} className="content">
      <Typography variant="subtitle1" component="h2">{t('Jump The Next Curve')}</Typography>
      {/*<Button variant="outlined" href="#outlined-buttons">{t('Registration')}</Button>*/}
    </Container>
  </Paper>
}