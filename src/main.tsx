import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import RouteProvider from './routes/RouteProvider'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://wpe-hiring.tokopedia.net/graphql',
    cache: new InMemoryCache(),
})

console.log(theme)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ApolloProvider client={client}>
                <RouteProvider />
            </ApolloProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
