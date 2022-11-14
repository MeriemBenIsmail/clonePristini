import type {NextPage} from 'next'
import Dynamic from 'next/dynamic'
import axios from 'axios'
import TwSeo from '../../../src/seo/TwSeo'
import Layout from '../../../front/layout'

const PageHeader=Dynamic(()=>import('../../../front/slides/pageHeader'),{ssr:false})
const TwDescription=Dynamic(()=>import('../../../src/templates/TwDescription'),{ssr:false})

const Page:NextPage=({pagedata}:any)=>{
  return <>
    {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
    <Layout>
      {pagedata?.page && <>
        <PageHeader settings={{title:pagedata.page.title,intro:pagedata.page.intro && pagedata.page.intro!=''? pagedata.page.intro:null,src:pagedata.page.image}} />
        <TwDescription settings={{item:pagedata.page}} />
      </>}    
    </Layout>
  </>
}

export async function getServerSideProps(ctx:any){
  let pagedata:any={}
  await axios({url:`${process.env.API}${ctx.locale}/page/${ctx.query.id}`,method:'GET'}).then((result)=>{if(result.data.status==200) pagedata=result.data}).catch((error)=>{})
  return {props:{pagedata}}
}

export default Page