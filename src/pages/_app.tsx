import CommonSnackbar from '@/Components/shared/CommonSnackbar';
import { Layout } from '@/Components/shared/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical:"top", horizontal:"right"}}>
      <CommonSnackbar Component={(prop:any)=> <Component {...pageProps} {...prop} /> } />
    </SnackbarProvider>
  </Layout>
}
