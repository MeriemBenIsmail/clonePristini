import {NextSeo} from 'next-seo'

interface TwSeoProps {seo:any} 

export default function TwSeo(props:TwSeoProps) {
  const {seo}=props
  return <NextSeo noindex={true} nofollow={true} titleTemplate='%s | AI University' title={seo.title} description={seo.description} canonical={process.env.HOSTNAME+seo.link} openGraph={{url:process.env.HOSTNAME+seo.link,title:seo.title,description:seo.description,images:[{url:seo.image}],site_name:process.env.SITENAME}} twitter={{handle:'@handle',site:'@'+process.env.SITENAME,cardType:'summary_large_image'}} />
}