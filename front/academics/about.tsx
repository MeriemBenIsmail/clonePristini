import {useRouter} from 'next/router'
import Dynamic from "next/dynamic";
import { useGetDiplomasQuery } from '../../src/api/diplomas'

const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const Links = Dynamic(() => import('../diplomas/links'), {ssr:false});

interface AboutProps {settings?:any} 

export default function About(props:AboutProps) {
  const {settings} = props;
  const router = useRouter();
  const culture = process.env.locales && router.locale && process.env.locales.includes(router.locale)? router.locale : process.env.defaultLocale;
  const {data} = useGetDiplomasQuery({culture:culture});

  return <Paper variant='section'>
    <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
      <Grid item md={6} xs={12} className="desc">
        {settings?.block && <>
        <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.label}} />
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
        </>}
      </Grid>
      <Grid item xl={4} md={5} xs={12}>{data && <Links settings={{items:data.items}} />}</Grid>
    </Grid>
  </Paper>
}