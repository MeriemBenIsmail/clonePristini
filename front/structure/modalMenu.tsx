import {useRouter} from 'next/router'
import Dynamic from "next/dynamic";
import * as React from 'react';
import {styled} from '@mui/material/styles';
import mainTheme from '../../src/styles/theme'; 
import logo from '../../public/images/pristini.png'

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false});
const Paper=Dynamic<any>(()=>import("@mui/material/Paper"),{ssr:false});
const Box=Dynamic<any>(()=>import("@mui/material/Box"),{ssr:false});
const Stack=Dynamic(()=>import('@mui/material/Stack'),{ssr:false});
const Grid=Dynamic(()=>import("@mui/material/Grid"),{ssr:false});
const Tabs=Dynamic<any>(()=>import("@mui/material/Tabs"),{ssr:false});
const Tab=Dynamic<any>(()=>import("@mui/material/Tab"),{ssr:false});
const List=Dynamic(()=>import("@mui/material/List"),{ssr:false});
const ListItem=Dynamic(()=>import("@mui/material/ListItem"),{ssr:false});
const IconButton=Dynamic<any>(()=>import('@mui/material/IconButton'),{ssr:false});
const SearchIcon=Dynamic(()=>import('@mui/icons-material/Search'),{ssr:false});
const MailIcon=Dynamic(()=>import('@mui/icons-material/MailOutline'),{ssr:false});
const CloseIcon=Dynamic(()=>import('@mui/icons-material/Close'),{ssr:false});
const TwImage=Dynamic(()=>import("../../src/templates/TwImage"),{ssr:false});
const ProfilesMenu=Dynamic(()=>import("./profilesMenu"),{ssr:false});

const TabsMenu=styled(Tabs)((theme:any)=>({
  ...theme.tabs,width:'100%',
  '& .MuiTab-root, & a':{display:'block',paddingBlock:mainTheme.spacing(3),paddingLeft:70,paddingRight:mainTheme.spacing(5),fontSize:40,fontWeight:700,lineHeight:1,color:'white',textAlign:'left',textTransform:'uppercase','&.Mui-selected, &:hover':{color:mainTheme.palette.secondary.main,textDecoration:'underline'}},
  '&.TabsMenu2 .MuiTab-root, &.TabsMenu2 a':{maxWidth:'100%',paddingBlock:mainTheme.spacing(2),fontSize:24,fontWeight:400,lineHeight:1.4,whiteSpace:'normal',textTransform:'none'},
  '&.TabsMenu2 .MuiTab-root:after, &.TabsMenu2 a:after':{opacity:0,transform:'translate3d(-18px,0,0)',position:'absolute',marginLeft:mainTheme.spacing(2),fontFamily:'Material Icons',content:'"chevron_right"',textTransform:'none'},
  '&.TabsMenu2 a.mainLink':{fontSize:38,color:mainTheme.palette.secondary.main,textDecoration:'underline'},
  '&.TabsMenu2 a:after':{content:'"east"'},
  //'&.TabsMenu2 a.mainLink:after':{content:'""'},
  '&.TabsMenu2 .MuiTab-root:hover:after, &.TabsMenu2 a:hover:after,&.TabsMenu2 .Mui-selected:after':{opacity:1,transform:'translate3d(0,0,0)'},
}))
const ContentMenu=styled(Box)((theme:any)=>({...theme.box,flexGrow:1,'& .MuiListItem-root a':{fontSize:20,color:'white'},'& .MuiListItem-root a:hover':{color:mainTheme.palette.secondary.main}}))

function a11yProps(index:any) {return {id:`vertical-tab-${index}`, 'aria-controls': `vertical-tabpanel-${index}`}}

interface TabPanelProps {children?:React.ReactNode, index:any, value:any}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other }=props;
  return <Box sx={{position:"relative",height:'100%','&:before':{content:'""',position:"absolute",top:'-40px',bottom:40,left:0,width:8,background:"linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,.2) 25%, rgba(255,255,255,.2) 75%,  rgba(255,255,255,0) 100%)"},
  
  
  
  
  
  borderLeft:'5px solid linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))'}} role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>{children}</Box>
}

interface ModalMenuProps {children?:any,settings?:any,handleCloseModal?:any,toggleDrawerSearch?:any,anchorDrawerSearch?:any} 

export default function ModalMenu(props: ModalMenuProps) {
  const router=useRouter();
  const {settings,handleCloseModal,toggleDrawerSearch,anchorDrawerSearch}=props;
  const [value,setValue]=React.useState(-1);
  const handleChange=(event: React.SyntheticEvent,newValue:any)=>{setValue(newValue);setValue2(-1)}
  const [value2,setValue2]=React.useState(-1);
  const handleChange2=(event:React.SyntheticEvent,newValue:any,level:any)=>{setValue2(parseInt(String(level)+String(newValue)))}

  return <>
    <Paper variant="deskHeader">
      <Stack direction="row" alignItems='center'>
        <IconButton size="large" edge="start" color="white" aria-label="" onClick={handleCloseModal}><CloseIcon /></IconButton>
        <Link href={`/${router.locale}`}><a className="logo" onClick={handleCloseModal}><TwImage settings={{src:logo,layout:'fixed',alt:"",width:120,height:120}} /></a></Link>
        <IconButton size="large" aria-label="" color="white" onClick={toggleDrawerSearch(anchorDrawerSearch, true)}><SearchIcon /></IconButton>
        <IconButton size="large" aria-label="" color="white" href="mailto:aiuniversity@pristini-international.tn"><MailIcon /></IconButton>      
      </Stack>
    </Paper>
    <Paper variant="deskMenu">
      <Grid container spacing={2} sx={{height:'100%'}}>
        <Grid item xs={4}>
          <TabsMenu orientation="vertical" variant="scrollable" value={value} onChange={handleChange}>
            {settings?.links?.map((item:any)=>(item.hasChild? <Tab component="div" label={item.label} {...a11yProps(item.id)} /> : <Link href={item.link} title={item.label}><a onClick={handleCloseModal}>{item.label}</a></Link>))}
          </TabsMenu>
        </Grid>
        <Grid item xs={4}>
          {settings?.links?.map((item:any,index:any)=>(item.hasChild && <TabPanel value={value} index={index}>
            <TabsMenu className='TabsMenu2' orientation="vertical" variant="scrollable" value={value2} onChange={(e:any, idx:any)=>handleChange2(e, idx, item.id)}>
              {item.childs && item.childs.map((child:any)=>(child.hasChild && child.childs? <Tab component="div" label={child.label} {...a11yProps(child.id)} /> : <Link href={child.link}><a onClick={handleCloseModal} title={child.label} className={child.template==2? 'mainLink' : ''}>{child.label}</a></Link>))}
            </TabsMenu>
          </TabPanel>))}
        </Grid>
        <Grid item xs={4}>
          <ContentMenu sx={{height:'100%'}}>
            {settings?.links?.map((item:any)=>(item.childs && item.childs.map((child:any, index:any)=>(child.hasChild && <TabPanel value={value2} index={parseInt(String(item.id)+String(index))}>
              <List disablePadding={true} aria-label={child.label}>{child.childs && child.childs.map((child1:any)=>(<ListItem sx={{paddingInline:mainTheme.spacing(5)}}><Link href={child1.link} title={child1.label} ><a onClick={handleCloseModal}>{child1.label}</a></Link></ListItem>))}</List>
            </TabPanel>))))}
          </ContentMenu>
        </Grid>
      </Grid>
    </Paper>
    <ProfilesMenu />
  </>
}