import Dynamic from "next/dynamic";
import {styled} from '@mui/material/styles';
import mainTheme from '../styles/theme';

const Box=Dynamic<any>(()=>import('@mui/material/Box'),{ssr:false});
const Article=styled(Box)((theme:any)=>({
  ...theme.box,
  '& h3':mainTheme.typography?.h3? mainTheme.typography?.h3:{},
  '& .subtitle1':mainTheme.typography?.subtitle1? mainTheme.typography?.subtitle1:{},
  '& .subtitle2':mainTheme.typography?.subtitle2? mainTheme.typography?.subtitle2:{},
  '& .body1':mainTheme.typography?.body1? mainTheme.typography?.body1:{},
  '& .body2':mainTheme.typography?.body2? mainTheme.typography?.body2:{},
  '& section, & .section':mainTheme.components?.MuiPaper?.variants? mainTheme.components.MuiPaper.variants[0].style:{},
  '& .block1':mainTheme.components?.MuiPaper?.variants? mainTheme.components.MuiPaper.variants[1].style:{},
  '& .block2':mainTheme.components?.MuiPaper?.variants? mainTheme.components.MuiPaper.variants[2].style:{},
  '& .block3':mainTheme.components?.MuiPaper?.variants? mainTheme.components.MuiPaper.variants[3].style:{},
}));

interface TwDescriptionProps {settings?:any}

export default function TwDescription(props: TwDescriptionProps) {
  const {settings} = props;
  return <Article dangerouslySetInnerHTML={{__html:settings.item.description}} />   
}