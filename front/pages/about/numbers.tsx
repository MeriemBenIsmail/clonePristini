import Dynamic from "next/dynamic"
import imgSrc from '../../../public/images/front/philosophy.png'

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false})
const Image=Dynamic(()=>import('next/image'),{ssr:false})
const CountUp=Dynamic(()=>import("react-countup"),{ssr:false})
const Paper = Dynamic<any>(() => import("@mui/material/Paper"),{ssr:false})
const Grid = Dynamic(() => import("@mui/material/Grid"),{ssr:false})
const Typography = Dynamic<any>(() => import("@mui/material/Typography"),{ssr:false})

interface NumbersProps {children?:any,settings?:any}

export default function Numbers(props:NumbersProps) {
  const {settings} = props;
  return <Paper variant='section' className="numbers">
    {settings?.block && <>
      <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.formatterLabel}} />
      <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
        <Grid item xl={4} md={5} xs={12} className="thumbs"><Link href={settings.block.link? settings.block.link : '#'} title={settings.block.label}><a className='thumb'><Image src={settings.block.image} alt={settings.block.label} layout='responsive' objectFit='cover' width={800} height={900} /></a></Link></Grid>
        <Grid item md={6} xs={12}>
          <CountUp end={2022} />
          <Typography variant="body1" component='h3'>Année de création de Pristini AI University</Typography>
          <CountUp end={13000} /> m<sup>2</sup>
          <Typography variant="body1" component='h3'>De locaux dédiés à l'innovation & la créativité</Typography>
          <CountUp end={10} />
          <Typography variant="body1" component='h3'>Domaines de spécialisation</Typography>
          <CountUp end={40} /> %
          <Typography variant="body1" component='h3'>D'enseignants internationaux</Typography>
          {settings.block.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.label}><a className='more'>{settings.block.linkLabel}</a></Link>}
        </Grid>
      </Grid>
      </>}
  </Paper>
}