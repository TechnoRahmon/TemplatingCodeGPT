import CommonSnackbar from '@/Components/shared/CommonSnackbar';
import { Layout } from '@/Components/shared/Layout'
import { ITemplateItem, Store, _getEmptyTempaltItem } from '@/store/localStorageStore';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [templateList, setTemplateList] = useState<Array<ITemplateItem>>([]);

  const fetchCallback = ()=>{
    const newStore = new Store();
    // get template list
    const templateList = newStore?.getPromptTemplateList();
    // set the template list
    setTemplateList(templateList.length ? templateList : [_getEmptyTempaltItem()]);
  }

  useEffect(() => {
    fetchCallback();
  }, [])

  return <Layout templateList={templateList} setTemplateList={setTemplateList} >
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical:"top", horizontal:"right"}}>
      <CommonSnackbar Component={(prop:any)=> <Component {...pageProps} {...prop} /> } templateList={templateList} fetchCallback={fetchCallback} />
    </SnackbarProvider>
  </Layout>
}
