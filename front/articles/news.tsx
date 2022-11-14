import {useRouter} from 'next/router'
import Dynamic from "next/dynamic"
import useTranslation from 'next-translate/useTranslation'
import {styled} from '@mui/material/styles'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {useGetContentsQuery} from '../../src/api/contents'
import mainTheme from '../../src/styles/theme';

const Link=Dynamic<any>(()=>import("next/link"),{ssr:false})
const Paper=Dynamic<any>(()=>import("@mui/material/Paper"),{ssr:false})
const Typography=Dynamic<any>(()=>import("@mui/material/Typography"),{ssr:false})
const Slider=Dynamic<any>(()=>import('react-slick'),{ssr:false})
const Card=Dynamic(() => import('@mui/material/Card'), {ssr:false})
const CardContent=Dynamic(() => import('@mui/material/CardContent'),{ssr:false})
const TwImage=Dynamic(()=>import("../../src/templates/TwImage"),{ssr:false})

const SlickCard = styled(Card)((theme:any)=> ({...theme.card,background:'transparent',boxShadow:'none',paddingInline:mainTheme.spacing(2)}));

export default function News(){
  const router=useRouter()
  const {t}=useTranslation('common')
  const {data}=useGetContentsQuery({culture:router.locale,id:1})
  const config={arrows:0,slidesToShow:3,responsive:[{breakpoint:1199,settings:{slidesToShow:2}},{breakpoint:599,settings:{slidesToShow:1}}]}

  return <>
    {data && <Paper variant='section' className='gray'>
      <Typography variant="subtitle2" component="h2"><Link as={data.topic? '':''} href={data.topic?.link? data.topic.link:''} title={data.topic? data.topic.link:''} >{data.topic? <a dangerouslySetInnerHTML={{__html:data.topic.formatterLabel}} />:<a><span>{t('Our')}</span> {t('News')}</a>}</Link></Typography>
      <Slider {...config}>
        {data.items && data.items.map((item:any) => (<SlickCard key={item.id}>
          <Link href={item.link}><a title={item.title}><TwImage settings={{src:item.image,alt:item.title,layout:'responsive',width:300,height:200}} /></a></Link>
          <CardContent>
            <Typography variant="h3" component="h3"><Link href='' alt={item.title} title={item.title}>{item.title}</Link></Typography>
          </CardContent>
        </SlickCard>))}
      </Slider>
    </Paper>}
  </>
}