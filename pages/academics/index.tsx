import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import {useGetBlocksQuery} from '../../src/api/blocks'
import TwSeo from '../../src/seo/TwSeo'
import Layout from '../../front/layout'

const PageHeader=Dynamic(()=>import('../../front/slides/pageHeader'),{ssr:false})
const About=Dynamic(()=>import('../../front/academics/about'),{ssr:false})
const AboutDiplomas=Dynamic(()=>import('../../front/diplomas/about'),{ssr:false})
const Diplomas=Dynamic(()=>import('../../front/diplomas/grid'),{ssr:false})

const Academics:NextPage=({pagedata}:any)=>{
  const router=useRouter()
  const {data}=useGetBlocksQuery({culture:router.locale})

  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      {data?.items && data.items[13]? <PageHeader settings={{title:data.items[13].label,intro:data.items[13].description,src:data.items[13].image}} /> : <PageHeader settings={{title:'Programs',src:'/images/front/about-us.png'}} />}
      {data?.items && data.items[14] && <About settings={{block:data.items[14]}} />}
      {data?.items && data.items[15] && <AboutDiplomas settings={{block:data.items[15]}} />}
      <Diplomas />    
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/settings/general`,method:'GET'}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default Academics