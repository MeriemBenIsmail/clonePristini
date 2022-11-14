import Dynamic from "next/dynamic";

const Image = Dynamic(() => import('next/image'), {ssr:false});

interface TwImageProps {settings:any} 

export default function TwImage(props: TwImageProps) {
  const {settings} = props; 
  return <Image src={settings.src} alt={settings.alt} 
    layout={settings.layout? settings.layout : 'responsive'}
    objectFit={settings.objectFit? settings.objectFit : 'cover'} 
    width={settings.width? settings.width : 800} 
    height={settings.height? settings.height : 450} />
}