import { ChakraProvider } from "@chakra-ui/react"
import type { AppProps } from "next/app"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import '../global.css'
import theme from "theme"

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
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
