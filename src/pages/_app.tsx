import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import theme from "theme"
import { DefaultSeo } from "next-seo"
import SEO from "../next-seo.config"
import "../global.css"

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
