import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import {useGetBlocksQuery} from '../src/api/blocks'
import TwSeo from '../src/seo/TwSeo'
import Layout from '../front/layout'

const PageHeader=Dynamic(()=>import('../front/slides/pageHeader'),{ssr:false})
const Model=Dynamic(()=>import('../front/pages/leadershipGouvernance/model'),{ssr:false})
const Directions=Dynamic(()=>import('../front/pages/leadershipGouvernance/directions'),{ssr:false})

const Leadershipouvernance:NextPage=({pagedata}:any)=>{
  const router=useRouter()
  const {data}=useGetBlocksQuery({culture:router.locale})
  
  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      {data?.items && data.items[11]? <PageHeader settings={{title:data.items[11].label,intro:data.items[11].description,src:data.items[11].image}} />:<PageHeader settings={{title:'Leadership & Gouvernance',src:'/images/front/leadership.png'}} />}
      {data?.items && data.items[12] && <Model settings={{block:data.items[12]}} />}
      {data?.items && data.items[16] && <Directions settings={{block:data.items[16]}} />}
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/settings/general`,method:'GET'}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default Leadershipouvernance