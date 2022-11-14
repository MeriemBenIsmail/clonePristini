import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import {useGetBlocksQuery} from '../src/api/blocks'
import TwSeo from '../src/seo/TwSeo'
import Layout from '../front/layout'

const Slides=Dynamic(()=>import('../front/slides/home'),{ssr:false})
const Profiles=Dynamic(()=>import('../front/home/profiles'),{ssr:false})
const Programs=Dynamic(()=>import('../front/home/programs'),{ssr:false})
const Trainings=Dynamic(()=>import('../front/home/trainings'),{ssr:false})
const News=Dynamic(()=>import('../front/articles/news'),{ssr:false})
const Numbers=Dynamic(()=>import('../front/home/numbers'),{ssr:false})
const Events=Dynamic(()=>import('../front/events/home'),{ssr:false})

const Home:NextPage=({pagedata}:any)=>{
  const router=useRouter()
  const {data}=useGetBlocksQuery({culture:router.locale})
  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      <Slides />
      <Profiles />
      {data?.items && data.items[1] && <Programs settings={{block:data.items[1]}} />}
      {data?.items && data.items[2] && <Trainings settings={{block:data.items[2]}} />}
      <News />
      <Numbers />
      <Events />
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/settings/general`,method:'GET'}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default Home