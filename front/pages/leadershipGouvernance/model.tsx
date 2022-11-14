import Dynamic from "next/dynamic";
import {styled} from '@mui/material/styles';
import mainTheme from '../../../src/styles/theme';
import imgSrc from '../../../public/images/front/model.png';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../../src/templates/TwImage"),  {ssr:false});
const ModelBox = styled(Paper)((theme:any) => ({
  ...theme.paper,
  '& .thumbs':{position:'relative',padding:mainTheme.spacing(2)},
  '& .thumbs::before':{position:'absolute',content:'""',bottom:0,left:0,width:200,height:300,background:mainTheme.palette.secondary.main},
  '& .thumbs::after':{position:'absolute',content:'""',top:0,right:0,width:100,height:300,background:mainTheme.palette.primary.main},
  '& .thumb':{position:'relative',display:'block',zIndex:2},
  [mainTheme.breakpoints.down('xl')]:{'& .thumbs::before':{width:200,height:200}},
  [mainTheme.breakpoints.down('lg')]:{'& .thumbs::before':{width:150,height:150}}
}))

interface ModelProps {children?:any, settings?:any} 

export default function Model(props:ModelProps) {
  const {settings} = props;

  return <ModelBox variant='section'>
    {settings?.block && <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
      <Grid item md={5} xs={12} className="thumbs"><Link as={settings.block.link? settings.block.link : '#'} href={settings.block.link? settings.block.link : '#'} title={settings.block.label}><a className='thumb'><TwImage settings={{src:settings.block.image? settings.block.image : imgSrc,layout:'responsive',alt:settings.block.label,width:1,height:1}} /></a></Link></Grid>
      <Grid item md={6} xs={12} className="desc">
        <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.formatterLabel}} />
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
        {settings.block.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.label}><a className='more'>{settings.block.linkLabel}</a></Link>}
      </Grid>
    </Grid>}
  </ModelBox>
}