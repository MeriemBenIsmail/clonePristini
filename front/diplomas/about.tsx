import Dynamic from "next/dynamic";
import {styled} from '@mui/material/styles';
import mainTheme from '../../src/styles/theme';
import imgSrc from '../../public/images/front/academics.png';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Box = Dynamic<any>(() => import("@mui/material/Box"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../src/templates/TwImage"),  {ssr:false});

const AboutDiploma = styled(Box)((theme:any) => ({
  ...theme.box,position:'relative',marginBlock:mainTheme.spacing(10),paddingBlock:mainTheme.spacing(10),
  '&::before':{content:'""',position:'absolute',top:0,bottom:0,left:'41.666667%',right:0,boxShadow:'0 '+mainTheme.spacing(3)+' '+mainTheme.spacing(6)+' 0 rgba(0,0,0,0.15)',zIndex:-1},
  '& .thumb':{position:'relative', '&:before':{position:'absolute',top:'-40px',content:'""',background:mainTheme.palette.secondary.main,width:200,height:100}},
  '& .desc':{position:'relative',paddingInline:mainTheme.spacing(12),'& .content':{width:'75%'}},
  [mainTheme.breakpoints.down('xl')]:{marginBlock:mainTheme.spacing(8),paddingBlock:mainTheme.spacing(8),'& .desc':{paddingInline:mainTheme.spacing(10),'& .content':{width:'85%'}}},
  [mainTheme.breakpoints.down('lg')]:{marginBlock:mainTheme.spacing(6),paddingBlock:mainTheme.spacing(6),'& .desc':{paddingInline:mainTheme.spacing(8),'& .content':{width:'100%'}}},
  [mainTheme.breakpoints.down('md')]:{marginBlock:mainTheme.spacing(5),paddingBlock:mainTheme.spacing(5),'&::before':{boxShadow:'none'},'& .desc':{padding:mainTheme.spacing(6)}},
  [mainTheme.breakpoints.down('sm')]:{marginBlock:mainTheme.spacing(4),paddingBlock:mainTheme.spacing(4),'& .desc':{padding:mainTheme.spacing(4)}}
}));  

interface AboutProps {settings?:any} 

export default function About(props:AboutProps) {
  const {settings} = props; 
  return <AboutDiploma>
    {settings?.block && <Grid container spacing={0} alignItems='center'>
      <Grid item md={5} xs={12}><Link as={settings.block.link? settings.block.link : '#'} href={settings.block.link? settings.block.link : '#'}><a className="thumb"><TwImage settings={{src:settings.block.image? imgSrc : imgSrc, layout:'responsive', alt:settings.block.label, width:800, height:800}} /></a></Link></Grid>
      <Grid item md={7} xs={12} className="desc">
        <Box className='content'>
          <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.formatterLabel}} />
          <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
          {settings?.block?.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.link}><a className='more'>{settings.block.linkLabel}</a></Link>}
        </Box>
      </Grid>
    </Grid>}
  </AboutDiploma>
}