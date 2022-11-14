import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import {useGetBlocksQuery} from '../src/api/blocks'
import TwSeo from '../src/seo/TwSeo'
import Layout from '../front/layout'

const PageHeader=Dynamic(()=>import('../front/slides/pageHeader'),{ssr:false})
const AboutMenu=Dynamic(()=>import('../front/pages/about/menu'),{ssr:false})
const History=Dynamic(()=>import('../front/pages/about/history'),{ssr:false})
const Numbers=Dynamic(()=>import('../front/pages/about/numbers'),{ssr:false})
const PresidentWord=Dynamic(()=>import('../front/pages/about/presidentWord'),{ssr:false})
const Parallax=Dynamic(()=>import('../front/pages/about/parallax'),{ssr:false})
const Philosophy=Dynamic(()=>import('../front/pages/about/philosophy'),{ssr:false})
const DiversityInclusion=Dynamic(()=>import('../front/pages/about/diversityInclusion'),{ssr:false})
const People=Dynamic(()=>import('../front/pages/about/people'),{ssr:false})

const About:NextPage=({pagedata}:any)=>{
  const router=useRouter()
  const {t}=useTranslation('common')
  const {data}=useGetBlocksQuery({culture:router.locale})

  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      {data?.items && data.items[3]? <PageHeader settings={{title:data.items[3].label,intro:data.items[3].description,src:data.items[3].image}} />:<PageHeader settings={{title:t('About us'),src:'/images/front/about-us.png'}} />}
      <AboutMenu />
      {data?.items && data.items[4] && <History settings={{block:data.items[4]}} />}
      {data?.items && data.items[5] && <Numbers settings={{block:data.items[5]}} />}
      {data?.items && data.items[6] && <PresidentWord settings={{block:data.items[6]}} />}
      {data?.items && data.items[7] && <Parallax settings={{block:data.items[7]}} />}
      {data?.items && data.items[8] && <Philosophy settings={{block:data.items[8]}} />}
      {data?.items && data.items[9] && <DiversityInclusion settings={{block:data.items[9]}} />}
      {data?.items && data.items[10] && <People settings={{block:data.items[10]}} />}
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/settings/general`,method:'GET'}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default About