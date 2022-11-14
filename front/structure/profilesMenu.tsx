import Dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation';
import student from '../../public/images/front/student1.png'
import professional from '../../public/images/front/professional1.png'
import business from '../../public/images/front/business1.png'

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../src/templates/TwImage"),  {ssr:false});

export default function Profiles() {
  const { t } = useTranslation('common')
  return <Paper variant="section" className="profilesMenu">
    <Grid alignItems="center" container spacing={2}>
      <Grid item xs={3}><Typography component="h2">{t('Quick Links')}</Typography></Grid>
      <Grid item xs={3}>
        <Link as="/fr/academics" href="/fr/academics"><a>
          <TwImage settings={{src:student, layout:'fixed', alt:"", width:60, height:60}} />
          <Typography variant="inherit" component="h3">{t('Student')}</Typography>
        </a></Link>
      </Grid>
      <Grid item xs={3} sx={{ textAlign:'center'}}>
        <Link as="/fr/diploma/3/formations-certifiantes" href="/fr/diploma/3/formations-certifiantes"><a>
          <TwImage settings={{src:professional, layout:'fixed', alt:"", width:60, height:60}} />
          <Typography variant="inherit" component="h3">{t('Professional')}</Typography>
        </a></Link>
      </Grid>
      <Grid item xs={3} sx={{ textAlign:'center'}}>
        <Link as="/fr/program/6/ai-clinic" href="/fr/program/6/ai-clinic"><a>
          <TwImage settings={{src:business, layout:'fixed', alt:"", width:60, height:60}} />
          <Typography variant="inherit" component="h3">{t('Business')}</Typography>
        </a></Link>
      </Grid>
    </Grid>
  </Paper>
}