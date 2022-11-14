import {useState} from 'react'
import Dynamic from 'next/dynamic'
import {styled} from '@mui/material/styles'

const Link=Dynamic<any>(()=>import('next/link'),{ssr:false})
const List=Dynamic<any>(()=>import('@mui/material/List'),{ssr:false})
const ListItem=Dynamic<any>(()=>import('@mui/material/ListItem'),{ssr:false})
const ListItemButton=Dynamic(()=>import('@mui/material/ListItemButton'),{ssr:false})
const ListItemText=Dynamic(()=>import('@mui/material/ListItemText'),{ssr:false})
const Collapse=Dynamic(()=>import('@mui/material/Collapse'),{ssr:false})
const ExpandMore=Dynamic(()=>import('@mui/icons-material/ExpandMore'),{ssr:false})
const ExpandLess=Dynamic(()=>import('@mui/icons-material/ExpandLess'),{ssr:false})
const Links=styled(List)((theme:any)=>({...theme.list,width:'100%',maxWidth:360,background:'#f5f5f5',boxShadow:'0 8px 16px 0 rgba(0,0,0,.2)'}))

interface DiploamasLinksProps {children?:any,settings?:any} 

export default function DiploamasLinks(props:DiploamasLinksProps) {
  const {settings}=props
  const [openDiplomasLinks,setOpenDiplomasLinks]=useState(0)
  const toggleDiplomasLinks=(id:any)=>{setOpenDiplomasLinks(openDiplomasLinks===id? 0:id)}

  return <Links component='nav'>
    {settings && settings.items && Object.values(settings.items).map((diploma:any)=>(Object.values(diploma.programs).length>0? <>
      <ListItemButton onClick={()=>toggleDiplomasLinks(diploma.id)} key={diploma.id}>
        <ListItemText primary={diploma.label} />
        {openDiplomasLinks===diploma.id? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openDiplomasLinks===diploma.id} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {Object.values(diploma.programs).map((program:any)=>( <ListItem key={program.id}><Link href={program.link} as={program.link} key={program.id}>{program.label}</Link></ListItem> ))}
        </List>
      </Collapse>
    </>:<ListItem key={diploma.id}><Link href={diploma.link} key={diploma.id}>{diploma.label}</Link></ListItem>))}
  </Links>
}