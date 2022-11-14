import Dynamic from "next/dynamic"
import useTranslation from 'next-translate/useTranslation'
import student from '../../public/images/front/student.png'
import professional from '../../public/images/front/professional.png'
import business from '../../public/images/front/business.png'

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false})
const Paper=Dynamic<any>(()=>import("@mui/material/Paper"),{ssr:false})
const Grid=Dynamic(()=>import("@mui/material/Grid"),{ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})
const TwImage=Dynamic(()=>import("../../src/templates/TwImage"),{ssr:false})

export default function Profiles() {
  const {t}=useTranslation('common')
  return <Paper variant='profiles'>
    <Grid alignItems="center" container spacing={2}>
      <Grid item md={3} xs={12}><Typography variant="subtitle2" component="h2"><span>{t('You')}</span> {t('Are')}</Typography></Grid>
      <Grid item md={3} xs={12} sx={{ textAlign:'center'}}>
        <Link as="/fr/academics" href="/fr/academics"><a>
          <TwImage settings={{src:student,layout:'fixed',alt:"",width:60,height:60}} />
          <Typography variant="inherit" component="h3">{t('Student')}</Typography>
        </a></Link>
      </Grid>
      <Grid item md={3} xs={12} sx={{ textAlign:'center'}}>
        <Link as="/fr/diploma/3/formations-certifiantes" href="/fr/diploma/3/formations-certifiantes"><a>
          <TwImage settings={{src:professional, layout:'fixed', alt:"", width:60, height:60}} />
          <Typography variant="inherit" component="h3">{t('Professional')}</Typography>
        </a></Link>
      </Grid>
      <Grid item md={3} xs={12} sx={{ textAlign:'center'}}>
        <Link as="/fr/program/6/ai-clinic" href="/fr/program/6/ai-clinic"><a>
          <TwImage settings={{src:business, layout:'fixed', alt:"", width:60, height:60}} />
          <Typography variant="inherit" component="h3">{t('Business')}</Typography>
        </a></Link>
      </Grid>
    </Grid>
  </Paper>
}