import type {NextPage} from 'next'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import {styled} from '@mui/material/styles'
import TwSeo from '../../../src/seo/TwSeo'
import mainTheme from '../../../src/styles/theme'
import Layout from '../../../front/layout'
import diplomaIcon from '../../../public/images/front/diploma.png'
import durationIcon from '../../../public/images/front/duration.png'
import delivredIcon from '../../../public/images/front/delivred.png'

const Image=Dynamic(()=>import('next/image'),{ssr:false})
const Paper=Dynamic<any>(()=>import('@mui/material/Paper'),{ssr:false})
const Box=Dynamic<any>(()=>import('@mui/material/Box'),{ssr:false})
const Container=Dynamic(()=>import('@mui/material/Container'),{ssr:false})
const Grid=Dynamic(()=>import('@mui/material/Grid'),{ssr:false})
const List=Dynamic(()=>import('@mui/material/List'),{ssr:false})
const ListItem=Dynamic(()=>import('@mui/material/ListItem'),{ssr:false})
const Typography=Dynamic<any>(()=>import('@mui/material/Typography'),{ssr:false})
const TwDescription=Dynamic(()=>import('../../../src/templates/TwDescription'),{ssr:false})
const PageHeader=Dynamic(()=>import('../../../front/slides/pageHeader'),{ssr:false})
const Diplomas=Dynamic(()=>import('../../../front/programs/diplomas'),{ssr:false})

const AboutUs=styled(Paper)((theme:any)=>({...theme.paper,'& .MuiTypography-subtitle2':{marginBottom:mainTheme.spacing(2),fontSize:34,letterSpacing:0},'& .desc':{paddingLeft:mainTheme.spacing(5)}}))

const Program:NextPage=({pagedata}:any)=>{
  const {t}=useTranslation('common')

  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      {pagedata?.item && <>
        <PageHeader settings={{title:pagedata.item.label,src:pagedata.item.media}} />
        {pagedata.item.template && pagedata.item.template!=2 && <AboutUs variant='section'>
          <Container>
            <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
              <Grid item md={7} className='desc'>
                <List>
                  <ListItem key={1}>
                    <Image src={diplomaIcon} alt={pagedata.item.seoAlt} layout='fixed' objectFit='cover' width={60} height={60} />
                    <Box className='desc'>
                      <Typography variant='subtitle2' component='h3'>{t('Diploma')}</Typography>
                      <Typography variant='body1' component='h3'>{pagedata.item.subLabel}</Typography>
                    </Box>
                  </ListItem>
                  <ListItem key={2}>
                    <Image src={durationIcon} alt={pagedata.item.seoAlt} layout='fixed' objectFit='cover' width={60} height={60} />
                    <Box className='desc'>
                      <Typography variant='subtitle2' component='h3'>{t('Duration of studies')}</Typography>
                      <Typography variant='body1' component='h3'>{pagedata.item.duration}</Typography>
                    </Box>
                  </ListItem>
                  <ListItem key={3}>
                    <Image src={delivredIcon} alt={pagedata.item.seoAlt} layout='fixed' objectFit='cover' width={60} height={60} />
                    <Box className='desc'>
                      <Typography variant='subtitle2' component='h3'>{t('Delivered by')}</Typography>
                      <Typography variant='body1' component='h3'>{pagedata.item.deliveredBy}</Typography>
                    </Box>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={4}><Diplomas /></Grid>
            </Grid>
          </Container>
        </AboutUs>}
        <TwDescription settings={{item:pagedata.item}} />
      </>}
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/program/${ctx.query.id}`,method:'GET'}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default Program