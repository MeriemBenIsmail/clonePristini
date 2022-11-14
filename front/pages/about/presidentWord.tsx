import Dynamic from "next/dynamic";
import {styled} from '@mui/material/styles';
import mainTheme from '../../../src/styles/theme';
import imgSrc from '../../../public/images/front/president.png';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../../src/templates/TwImage"),  {ssr:false});
const PresidentWordBox = styled(Paper)((theme:any) => ({
  ...theme.paper,paddingBlock:mainTheme.spacing(12),
  '&::before':{content:'""',position:'absolute',top:0,right:0,left:0,bottom:0,background:'url(/images/front/bg-president.png)',backgroundSize: 'auto 100%',backgroundRepeat:'no-repeat',backgroundPosition:'right top',zIndex:0},
  '& .desc':{position:'relative',zIndex:2},
  [mainTheme.breakpoints.down('md')]:{'& .desc':{order:1,marginTop:mainTheme.spacing(5)},'& .thumb':{order:0}},
}))

interface PresidentWordProps {settings?:any} 

export default function PresidentWord(props:PresidentWordProps) {
  const {settings} = props; 
  return <PresidentWordBox variant="section">
    {settings?.block && <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
      <Grid item md={6} xs={12} className="desc">
        <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.label}} />
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
        {settings?.block?.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.link}><a className='more'>{settings.block.linkLabel}</a></Link>}
      </Grid>
      <Grid item xl={4} md={5} xs={12} className='thumb'><Link as={settings.block.link? settings.block.link : '#'} href={settings.block.link? settings.block.link : '#'} title={settings.block.label}><a><TwImage settings={{src:settings.block.image? settings.block.image : imgSrc,layout:'responsive',alt:settings.block.label,width:4,height:5}} /></a></Link></Grid>
    </Grid>}
  </PresidentWordBox>
}