import { useQuery } from '@apollo/client'
import { GetContactList } from '../gql/queries'
import { createContext, ReactNode } from 'react'
import { ApolloQueryType } from '../gql/apolloConfig'

export type TContact = {
    __typename: string
    id: number
    first_name: string
    last_name: string
    phones: {
        __typename: string
        number: string
    }[]
    created_at: string
}

type TGetContact = {
    contact: TContact[]
}

export const ContactContext = createContext<ApolloQueryType<TGetContact>>({})

export const ContactListBaseVar = {
    order_by: {
        first_name: 'asc',
    },
    offset: 0,
    limit: 10,
}

function ContactProvider({ children }: { children?: ReactNode }) {
    const { data, error, loading, refetch, fetchMore } = useQuery<TGetContact>(GetContactList, {
        variables: ContactListBaseVar,
    })

    return <ContactContext.Provider value={{ data, error, loading, refetch, fetchMore }}>{children}</ContactContext.Provider>
}

export default ContactProvider
