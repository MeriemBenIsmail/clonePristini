import {useRouter} from 'next/router'
import Dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation';
import { useGetDiplomasQuery } from '../../src/api/diplomas'

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});

export default function Diplomas() {
  const {t} = useTranslation('common');
  const router = useRouter();
  const culture = process.env.locales && router.locale && process.env.locales.includes(router.locale)? router.locale : process.env.defaultLocale;
  const {data} = useGetDiplomasQuery({culture:culture});
  
  return <Paper variant='section'>
    <Grid container spacing={2}>
      {data?.items && Object.values(data.items).map((item:any) => (<Grid item md={3} key={item.id} className='card'>
        <Typography variant="subtitle2" component="h3"><Link as={item.link} href={item.link} title={item.label}>{item.label}</Link></Typography>
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:item.intro}} />
        <Link as={item.link} href={item.link} title={item.label}><a className='more'>{t('Read more')}</a></Link>        
      </Grid>))}
    </Grid>
  </Paper>
}