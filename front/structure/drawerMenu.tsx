import * as React from 'react'
import Dynamic from "next/dynamic"

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false})
const List=Dynamic<any>(()=>import('@mui/material/List'),{ssr:false})
const ListItem=Dynamic<any>(()=>import('@mui/material/ListItem'),{ssr:false})
const ListItemButton=Dynamic(()=>import('@mui/material/ListItemButton'),{ssr:false})
const ListItemText=Dynamic(()=>import('@mui/material/ListItemText'),{ssr:false})
const Collapse=Dynamic(()=>import('@mui/material/Collapse'),{ssr:false})
const ExpandMore=Dynamic(()=>import('@mui/icons-material/ExpandMore'),{ssr:false})
const ExpandLess=Dynamic(()=>import('@mui/icons-material/ExpandLess'),{ssr:false})

interface TwDrawerMenuProps {children?:any,settings?:any} 

export default function DrawerMenu(props:TwDrawerMenuProps) {
  const {settings}=props
  const [openCollapse,setOpenCollapse]=React.useState(0)
  const toggleCollapse=(id:any)=>{setOpenCollapse(openCollapse===id? 0:id)}

  const [openCollapse2,setOpenCollapse2]=React.useState(0)
  const toggleCollapse2=(id:any)=>{setOpenCollapse2(openCollapse2===id? 0:id)}
  
  return <List component="nav">
    {settings?.links?.map((item:any)=>(item.hasChild? <>
      <ListItemButton onClick={()=>toggleCollapse(item.id)} key={item.id}>
        <ListItemText primary={item.label} />
        {openCollapse===item.id? <ExpandLess />:<ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapse===item.id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.childs.map((child:any) => (child.hasChild? <>
            <ListItemButton onClick={()=>toggleCollapse2(child.id)} key={child.id}>
              <ListItemText primary={child.label} />
              {openCollapse2===child.id? <ExpandLess />:<ExpandMore />}
            </ListItemButton>
            <Collapse in={openCollapse2===child.id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {child.childs.map((child2:any)=>(<ListItem key={child2.id}><Link href={child2.link}>{child2.label}</Link></ListItem>))}
              </List>
            </Collapse>
          </>:<ListItem key={child.id}><Link href={child.link} as={child.link}>{child.label}</Link></ListItem> ))}
        </List>
      </Collapse>
    </>:<ListItem key={item.id}><Link href={item.link} as={item.link}>{item.label}</Link></ListItem>))}
  </List>
}