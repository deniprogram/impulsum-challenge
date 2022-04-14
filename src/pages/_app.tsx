import type { AppProps } from 'next/app'
import { ComposerProvider } from '@cmpsr/components'
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from '../contexts/AuthContext'
import { client } from "../lib/apollo";
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ComposerProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ComposerProvider>
    </ApolloProvider>
  )
}

export default MyApp
