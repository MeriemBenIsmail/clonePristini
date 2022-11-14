import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import Dynamic from 'next/dynamic'
import axios from "axios"
import useTranslation from 'next-translate/useTranslation'
import {useGetDiplomasQuery} from '../../../src/api/diplomas'
import TwSeo from "../../../src/seo/TwSeo"
import Layout from "../../../front/layout"

const Paper=Dynamic<any>(()=>import("@mui/material/Paper"),{ssr:false})
const Grid=Dynamic(()=>import("@mui/material/Grid"),{ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})
const TwDescription=Dynamic(()=>import("../../../src/templates/TwDescription"),{ssr:false})
const PageHeader=Dynamic(()=>import('../../../front/slides/pageHeader'),{ssr:false})
const Links=Dynamic(()=>import('../../../front/diplomas/links'),{ssr:false})
const Programs=Dynamic(()=>import('../../../front/programs/list'),{ssr:false})

const Diploma:NextPage=({pagedata}:any)=>{
  const router=useRouter()
  const {t}=useTranslation('common')
  const {data}=useGetDiplomasQuery({culture:router.locale})
  
  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      {pagedata?.item && <>
        <PageHeader settings={{title:pagedata.item.subLabel,src:pagedata.item.image? pagedata.item.image:'/images/front/masters.png'}} />
        {pagedata.item.template && pagedata.item.template!=2 && <>
        <Paper variant='section'>
          <Grid container spacing={2} alignItems='center' justifyContent='space-between'>
            <Grid item md={6} xs={12} className="desc">
              <Typography variant="subtitle2" component="h2">{t('Our programs')}</Typography>
              <Typography variant="body1" dangerouslySetInnerHTML={{__html:pagedata.item.description}} />
            </Grid>
            <Grid item  xl={4} md={5} xs={12}><Links settings={{items:data?.items,openDiplomasLinks:pagedata.item.id}} /></Grid>
          </Grid>
        </Paper>
        <Programs settings={{item:pagedata.item}} />
        </>}
        {pagedata.item.template && pagedata.item.template == 2 && <TwDescription settings={{item:pagedata.item}} />}
      </>}
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/diploma/${ctx.query.id}`,method:"GET"}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default Diploma