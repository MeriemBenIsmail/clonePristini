import type {NextPage } from 'next'
import {useRouter} from 'next/router'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import {styled} from '@mui/material/styles'
import {useSearchProgramsQuery} from '../../../src/api/programs'
import TwSeo from '../../../src/seo/TwSeo'
import mainTheme from '../../../src/styles/theme'
import Layout from '../../../front/layout'

const Link=Dynamic<any>(()=>import('next/link'),{ssr:false})
const Image=Dynamic<any>(()=>import('next/image'),{ssr:false})
const Container=Dynamic<any>(()=>import('@mui/material/Container'),{ssr:false})
const Box=Dynamic(()=>import('@mui/material/Box'),{ssr:false})
const Grid=Dynamic(()=>import('@mui/material/Grid'),{ssr:false})
const Card=Dynamic(()=>import('@mui/material/Card'), {ssr:false})
const CardContent=Dynamic(()=>import('@mui/material/CardContent'),{ssr:false})
const Typography = Dynamic<any>(() => import('@mui/material/Typography'), { ssr: false })
const PageHeader=Dynamic(()=>import('../../../front/slides/pageHeader'),{ssr:false})

const Programs=styled(Box)((theme:any)=>({...theme.box,position:'relative',paddingBlock:mainTheme.spacing(8),'& .MuiCard-root':{marginBottom:mainTheme.spacing(6)},'& .MuiCardContent-root':{paddingInline:mainTheme.spacing(6)},'& h3':{fontSize:mainTheme.spacing(4),fontWeight:900},'& h3 a':{color:mainTheme.palette.primary.main}}))

const Diploma:NextPage=({pagedata}:any)=>{
  const router=useRouter()
  const {t}=useTranslation('common')
  const {data}=useSearchProgramsQuery({culture:router.locale,tag:router.query.tag})
  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      <PageHeader settings={{title:t('Search results'),src:'/images/front/masters.png'}} />
      <Programs>
        <Container>
          {data?.items?.map((item:any)=>(<Card key={item.id}>
            <Grid container spacing={2} sx={{alignItems:'center'}}>
              <Grid item md={4} xs={12}><Link as={item.link} href={item.link} title={item.label}><Image src={item.image} alt={item.label} layout='responsive' objectFit='cover' width={600} height={600} /></Link></Grid>
              <Grid item md={8} xs={12}>
                <CardContent>
                  <Typography variant='h3' component='h3'><Link as={item.link} href={item.link} title={item.label}>{item.label}</Link></Typography>
                  <Typography variant='body1' dangerouslySetInnerHTML={{__html:item.intro}} />
                  {item.display && <Link as={item.link} href={item.link} title={item.label}><a className='more'>{t('More informations')}</a></Link>}
                </CardContent>   
              </Grid>
            </Grid>
          </Card>))}
        </Container>
      </Programs>
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/settings/general`,method:'GET'}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default Diploma