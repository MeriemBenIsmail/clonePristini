import Dynamic from "next/dynamic"

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false})
const Paper=Dynamic<any>(()=>import("@mui/material/Paper"),{ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})

interface HistoryProps {settings?:any} 

export default function History(props:HistoryProps){
  const {settings}=props; 
  return <>
    {settings?.block && <Paper variant='section' className='intro'>
      <Typography variant="subtitle2" component="h2" dangerouslySetInnerHTML={{__html:settings.block.label}} />
      <Typography variant="body1" dangerouslySetInnerHTML={{__html:settings.block.description}} />
      {settings.block.link? <Link href={settings.block.link}><a className='more' title={settings.block.link}>{settings.block.linkLabel}</a></Link>:''}
      </Paper>}
  </>
}