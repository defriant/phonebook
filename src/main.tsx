import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import { client } from './gql/apolloConfig'
import RouteProvider from './routes/RouteProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouteProvider>
            <ChakraProvider theme={theme}>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </ChakraProvider>
        </RouteProvider>
    </React.StrictMode>,
)
