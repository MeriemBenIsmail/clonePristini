import Dynamic from "next/dynamic";
import imgSrc from '../../public/images/front/img1.png';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Box = Dynamic<any>(() => import("@mui/material/Box"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../src/templates/TwImage"),  {ssr:false});

interface ProgramsProps {settings?:any} 

export default function Programs(props:ProgramsProps) {
  const {settings} = props; 
  return <Paper variant='block1'>
    {settings?.block && <Grid container spacing={0} alignItems='center'>
      <Grid item md={5} xs={12}><Link as={settings.block.link? settings.block.link : '#'} href={settings.block.link? settings.block.link : '#'}><a className="thumb"><TwImage settings={{src:settings.block.image? imgSrc : imgSrc,alt:settings.block.label,width:800,height:800}} /></a></Link></Grid>
      <Grid item md={7} xs={12} className="desc">
        <Box className='content'>
          <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.formatterLabel}} />
          <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
          {settings?.block?.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.link}><a className='more'>{settings.block.linkLabel}</a></Link>}
        </Box>
      </Grid>
    </Grid>}
  </Paper>
}