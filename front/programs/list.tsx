import Dynamic from "next/dynamic"
import useTranslation from 'next-translate/useTranslation'
import { styled } from '@mui/material/styles'
import mainTheme from '../../src/styles/theme'

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false})
const Image=Dynamic<any>(()=>import('next/image'),{ssr:false})
const Box=Dynamic(()=>import("@mui/material/Box"),{ssr:false})
const Container=Dynamic<any>(()=>import("@mui/material/Container"),{ssr:false})
const Grid=Dynamic(()=>import("@mui/material/Grid"),{ssr:false})
const Card=Dynamic(()=>import("@mui/material/Card"),{ssr:false})
const CardContent=Dynamic(()=>import("@mui/material/CardContent"),{ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})
const Programs=styled(Box)((theme:any)=>({...theme.box,position:'relative',paddingBlock:mainTheme.spacing(8),'& .MuiCard-root':{marginBottom:mainTheme.spacing(6)},'& .MuiCardContent-root':{paddingInline:mainTheme.spacing(6)},'& h3':{fontSize:mainTheme.spacing(4),fontWeight:900},'& h3 a':{color:mainTheme.palette.primary.main}}));

interface ProgramsListProps {settings?:any} 

export default function ProgramsList(props:ProgramsListProps){
  const {t}=useTranslation('common')
  const {settings}=props
  
  return <Programs>
    <Container>
      {settings && settings.item && settings.item.programs && Object.values(settings.item.programs).map((program:any)=>(
      <Card key={program.id} id={program.slug}>
        <Grid container spacing={2} sx={{alignItems:'center'}}>
          <Grid item md={4} xs={12}><Link href={program.link}><a title={program.label}><Image src={program.image} alt={program.label} layout='responsive' objectFit='cover' width={600} height={600} /></a></Link></Grid>
          <Grid item md={8} xs={12}>
            <CardContent>
              <Typography variant="h3" component="h3"><Link as={program.link} href={program.link} title={program.label}>{program.label}</Link></Typography>
              <Typography variant="body1" dangerouslySetInnerHTML={{__html:program.intro}} />
              {program.display && <Link as={program.link} href={program.link} title={program.label}><a className='more'>{t('More informations')}</a></Link>}
            </CardContent>   
          </Grid>
        </Grid>
      </Card>
      ))}
    </Container>
  </Programs>
}