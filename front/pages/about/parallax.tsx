import Dynamic from "next/dynamic";
import {Parallax} from 'react-parallax';
import {styled} from '@mui/material/styles';
import mainTheme from '../../../src/styles/theme';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Box = Dynamic<any>(() => import("@mui/material/Box"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const ParallaxBox = styled(Paper)((theme:any) => ({
  ...theme.paper,paddingInline:0,
  '&:before':{background:'linear-gradient(269deg,rgba(30,23,95,0.00) 10%, #000000 90%)',opacity:.8,content:'""',position:'absolute',top:0,bottom:0,left:0,right:0,zIndex:1},
  '& .desc':{position:'relative',width:'60%',paddingBlock:mainTheme.spacing(12),paddingInline:150,color:'white',zIndex:2},
  '& h2, & .more':{color:'white'},
  [mainTheme.breakpoints.down('xl')]:{paddingInline:0,'& .desc':{width:'80%',paddingInline:120}},
  [mainTheme.breakpoints.down('lg')]:{paddingInline:0,'& .desc':{width:'90%',paddingInline:90}},
  [mainTheme.breakpoints.down('md')]:{paddingInline:0,'& .desc':{width:'100%',paddingInline:60}},
  [mainTheme.breakpoints.down('sm')]:{paddingInline:0,'& .desc':{paddingInline:32}}
}))

interface ParallaxProps {children?:any, settings?:any} 

export default function AboutParallax(props:ParallaxProps) {
  const {settings} = props; 
  return <ParallaxBox variant='section'>
    <Parallax bgImage={settings.block.image? '/images/front/parallax.png' : '/images/front/parallax.png' }>
      {settings?.block && <Box className="desc">
        <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.formatterLabel}} />
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
        {settings?.block?.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.label}><a className='more'>{settings.block.linkLabel}</a></Link>}
      </Box>}
    </Parallax>
  </ParallaxBox>
}