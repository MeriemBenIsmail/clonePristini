import Dynamic from "next/dynamic";
import { useGetLinksQuery } from '../../../src/api/links'

const Link = Dynamic<any>(() => import("next/link"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});

export default function Profiles() {
  const {data} = useGetLinksQuery({id:3});    
  return <Paper variant='aboutMenu'>{data?.items?.map((item:any,index:number) => (<Link href={item.link} key={item.id}><a>{item.label}</a></Link>))}</Paper>
}