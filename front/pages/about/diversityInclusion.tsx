import Dynamic from "next/dynamic";
import imgSrc from '../../../public/images/front/diversity.png';

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Box = Dynamic<any>(() => import("@mui/material/Box"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});
const TwImage = Dynamic(() => import("../../../src/templates/TwImage"),  {ssr:false});

interface DiversityInclusionProps {settings?:any} 

export default function DiversityInclusion(props:DiversityInclusionProps) {
  const {settings} = props;
  return <Paper variant='block3'>
    {settings?.block && <>
      <TwImage settings={{src:settings.block.image? settings.block.image : imgSrc,alt:settings.block.label,width:10,height:3}} />     
      <Box className="desc">
        <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.label}} />
        <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
        {settings.block.link && <Link as={`${settings.block.link}`} href={settings.block.link} title={settings.block.label}><a className='more'>{settings.block.linkLabel}</a></Link>}
      </Box>
    </>}
  </Paper>
}
