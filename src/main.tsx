import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import { ApolloProvider } from '@apollo/client'
import App from './App'
import { client } from './gql/apolloConfig'

console.log(theme)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
