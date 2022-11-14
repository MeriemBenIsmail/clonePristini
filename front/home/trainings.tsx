import Dynamic from "next/dynamic";
import imgSrc from '../../public/images/front/4.png';
import imgSrc1 from '../../public/images/front/6.png';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../src/templates/TwImage"),  {ssr:false});

interface TrainingsProps {settings?:any} 

export default function Trainings(props:TrainingsProps) {
  const {settings} = props;
  return <Paper variant='block2' className='trainings'>
    {settings?.block && <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
      <Grid item md={6} xs={12} className="desc">
        <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.formatterLabel}} />
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
        {settings.block.link? <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.link}><a className='more'>{settings.block.linkLabel}</a></Link> : ''}
      </Grid>
      <Grid item xl={4} md={5} xs={12} className="thumbs">
        <Link as={settings.block.link? settings.block.link : '#'} href={settings.block.link? settings.block.link : '#'}><a className='thumb1'><TwImage settings={{src:settings.block.image? settings.block.image : imgSrc, layout:'responsive', alt:settings.block.label, width:2, height:3}} /></a></Link>
        <Link as={settings.block.link? settings.block.link : '#'} href={settings.block.link? settings.block.link : '#'}><a className='thumb2'><TwImage settings={{src:imgSrc1, layout:'responsive', alt:settings.block.label, width:1, height:1}} /></a></Link>
      </Grid>
    </Grid>}
  </Paper>
}