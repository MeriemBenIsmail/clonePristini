import Dynamic from "next/dynamic"

const Paper=Dynamic<any>(()=>import("@mui/material/Paper"),{ssr:false})
const Box=Dynamic(()=>import("@mui/material/Box"),{ssr:false})
const Grid=Dynamic<any>(()=>import("@mui/material/Grid"), {ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})
const TwImage=Dynamic(()=>import("../../src/templates/TwImage"),{ssr:false})

interface PageHeaderProps {children?:any,settings?:any}

export default function PageHeader(props:PageHeaderProps){
  const {settings}=props;
  return <>
    {settings && <Paper variant='pageHeader'>
      <TwImage settings={{src:settings.src,alt:settings.title,width:settings?.width||2000,height:settings?.height||800}} />
      <Box className="content">
        {settings.intro? <Grid container spacing={2}>
          <Grid item lg={5} xs={12}>{settings.title && <Typography textTransform="capitalize" variant="subtitle1" component="h1" dangerouslySetInnerHTML={{__html:settings.title}} />}</Grid>
          <Grid item lg={6} xs={12} className="desc"><Typography textTransform="capitalize" variant="body1" dangerouslySetInnerHTML={{__html:settings.intro}} /></Grid>
        </Grid> : (settings.title && <Typography textTransform="capitalize" variant="subtitle1" component="h1">{settings.title}</Typography>)}
      </Box>
    </Paper>}    
  </>
}