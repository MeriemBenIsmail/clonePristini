import {useRouter} from 'next/router'
import Dynamic from 'next/dynamic'
import {useGetDiplomasQuery} from '../../src/api/diplomas'

const Links=Dynamic(()=>import('../../front/diplomas/links'),{ssr:false})

interface DiplomasProps {settings?:any} 

export default function Diplomas(props:DiplomasProps){
  const router=useRouter();
  const {data} = useGetDiplomasQuery({culture:router.locale})
  
  return <>{data?.items && <Links settings={{items:data.items,openDiplomasLinks:0}} />}</>
}
