import {useRouter} from 'next/router'
import Dynamic from "next/dynamic"
import useTranslation from 'next-translate/useTranslation'
import {zeroPad} from "react-countdown"

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false})
const Image=Dynamic(()=>import('next/image'),{ssr:false})
const Countdown=Dynamic(()=>import("react-countdown"),{ssr:false})
const Paper=Dynamic<any>(()=>import("@mui/material/Paper"),{ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})
const Box=Dynamic(()=>import("@mui/material/Box"),{ssr:false})
const Grid=Dynamic(()=>import("@mui/material/Grid"),{ssr:false})
const Card=Dynamic(()=>import("@mui/material/Card"),{ssr:false})
const CardContent=Dynamic(()=>import("@mui/material/CardContent"),{ssr:false})
const PlaceIcon=Dynamic(()=>import('@mui/icons-material/Place'),{ssr:false})

export default function Home() {
  const {t}=useTranslation('common')
  const router=useRouter();
  const renderer=({days,hours,minutes,seconds,completed}:any)=>{return (completed)? <span></span>:<span className='timedown'><span>{zeroPad(days)}</span>:<span>{zeroPad(hours)}</span>:<span>{zeroPad(minutes)}</span>:<span>{zeroPad(seconds)}</span></span>}
  const start = new Date('2022-07-30T16:00:00')
  return <Paper variant='section' className="events">
    <Typography variant="subtitle2" component="h2"><Link href={`/${router.locale}`} title=""><a><span>{t('Our')}</span> {t('Events')}</a></Link></Typography>
    <Card key={1}>
      <Grid container spacing={2} sx={{alignItems:'end'}}>
        <Grid xl={4} lg={5} sm={8} xs={12}><Link href={''} title={''}><Image src={'/images/front/event.png'} alt={'Marathon Run for Fun By Pristini'} layout='responsive' objectFit='cover' width={300} height={300} /></Link></Grid>
        <Grid xl={8} lg={7} sm={12} xs={12} className='desc'>
          <CardContent>
            <Typography variant="body1">Upcoming Event</Typography>
            <Typography variant="h3" component="h3"><Link href={''} title={'Marathon Run for Fun By Pristini'}>Marathon Run for Fun By Pristini</Link></Typography>
            <Typography className='place'><PlaceIcon /> Novation city - Pôle technologique - Sousse</Typography>
            <Box sx={{display:{sm:'flex'},alignItems:'end'}}>
              <Box sx={{flexGrow:1}}><Countdown date={start} renderer={renderer} /></Box>
              <Link href={'https://docs.google.com/forms/d/e/1FAIpQLSeLcEDX4nLsB2li7XnwZJThi3RswUyYU3St3bxOdmviDLWM-Q/viewform'}><a className='more' title={'Marathon Run for Fun By Pristini'} target='_blank'>{t('Participate')}</a></Link>
            </Box>
            <Box className='dateEvent'>
              <Box className='day'>30</Box>
              <Box className='month'>Jui</Box>
              <Box className='year'>2022</Box>
            </Box>
          </CardContent>    
        </Grid>
      </Grid>
    </Card>
  </Paper> 
}