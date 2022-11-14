import Dynamic from "next/dynamic";
import mainTheme from '../../../src/styles/theme';
import {styled} from '@mui/material/styles';

const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const TwDescription = Dynamic(() => import("../../../src/templates/TwDescription"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});

const DirectionsBox = styled(Paper)((theme:any) => ({
  ...theme.paper,
  
  
  '& .thumb':{position:'relative',margin:mainTheme.spacing(2)},
  '& .thumb::before':{position:'absolute',content:'""',top:'-16px',right:'-16px',width:200,height:300,background:mainTheme.palette.secondary.main},
  '& .MuiCard-root:nth-child(2n+1) .thumb':{order:0},
  '& .MuiCard-root:nth-child(2n+1) .desc':{order:1},
  '& .MuiCard-root:nth-child(2n+1) .thumb::before':{top:'auto',bottom:'-16px',right:'auto',left:'-16px',height:200}
}))

interface DirectionsProps {settings?:any} 

export default function Directions(props:DirectionsProps) {
  const {settings} = props;

  return <>
    {settings?.block && <Paper variant='section'><Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.label}} /></Paper>}
    {settings?.block && <TwDescription settings={{item:settings.block}} />}
  </>
}