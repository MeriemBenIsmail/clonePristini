import Dynamic from "next/dynamic";
import {styled} from '@mui/material/styles';
import mainTheme from '../../../src/styles/theme';
import imgSrc from '../../../public/images/front/people.png';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../../src/templates/TwImage"),  {ssr:false});

const PeopleBox = styled(Paper)((theme:any) => ({
  ...theme.paper,
  '& .thumbs':{position:'relative'},
  '& .thumbs::before':{position:'absolute',content:'""',bottom:0,left:'-32px',width:150,height:150,borderRadius:'100%',background:mainTheme.palette.secondary.main},
  '& .thumb':{position:'relative',display:'block',marginBottom:mainTheme.spacing(4)},
  [mainTheme.breakpoints.down('xl')]:{'& .thumbs::before':{width:200,height:200}},
  [mainTheme.breakpoints.down('lg')]:{'& .thumbs::before':{width:150,height:150}}
}))

interface PeopleProps {children?:any, settings?:any} 

export default function People(props:PeopleProps) {
  const {settings} = props; 
  return <PeopleBox variant='section'>
    {settings?.block && <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
      <Grid item md={5} xs={12} className="thumbs"><Link as={settings.block.link? settings.block.link : '#'} href={settings.block.link? settings.block.link : '#'}><a className='thumb'><TwImage settings={{src:settings.block.image? settings.block.image : imgSrc,layout:'responsive',alt:settings.block.label,width:5,height:4}} /></a></Link></Grid>
      <Grid item md={6} xs={12} className="desc">
        <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.formatterLabel}} />
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
        {settings.block.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.label}><a className='more'>{settings.block.linkLabel}</a></Link>}
      </Grid>
    </Grid>}
  </PeopleBox>
}