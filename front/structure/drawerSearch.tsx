import {useRouter} from 'next/router'
import Dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation';
import * as React from 'react';

const Stack=Dynamic<any>(()=>import("@mui/material/Stack"),{ssr:false});
const TextField=Dynamic<any>(()=>import("@mui/material/TextField"),{ssr:false});
const SearchIcon=Dynamic<any>(()=>import('@mui/icons-material/Search'),{ssr:false});

interface TwDrawerSearchProps {setStateDrawerSearch?:any,anchorDrawerSearch:any,settings?:any} 

export default function DrawerSearch(props: TwDrawerSearchProps) {
  const {t} = useTranslation('common');
  const {setStateDrawerSearch,anchorDrawerSearch} = props;
  const router = useRouter();
  const culture = process.env.locales && router.locale && process.env.locales.includes(router.locale)? router.locale : process.env.defaultLocale;

  const handleKeyword = async (e:any) => {
    const {name,value}=e.target;
    if((e as React.KeyboardEvent).key==='Enter' && value!=''){
      setStateDrawerSearch({top:false});
      router.push(`/${culture}/programs/search/${value}`)
    }
  }

  return <Stack direction="row" spacing={1} alignItems="center">
    <TextField fullWidth color="white" required id="keyword" name="keyword" label={t('Keyword')+'...'} variant="standard" margin="dense" onKeyDown={handleKeyword} />
    <SearchIcon color="white" />
  </Stack>
}