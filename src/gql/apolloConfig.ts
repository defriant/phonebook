import { ApolloClient, ApolloError, ApolloQueryResult, FetchMoreQueryOptions, InMemoryCache, OperationVariables } from '@apollo/client'

export const client = new ApolloClient({
    uri: 'https://wpe-hiring.tokopedia.net/graphql',
    cache: new InMemoryCache(),
})

export type ApolloQueryType<TData> = {
    data?: TData
    error?: ApolloError | undefined
    loading?: boolean
    refetch?: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<TData>>
    fetchMore?: <TFetchData = TData, TFetchVars extends OperationVariables = OperationVariables>(
        fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
            updateQuery?: (
                previousQueryResult: TData,
                options: {
                    fetchMoreResult: TFetchData
                    variables: TFetchVars
                },
            ) => TData
        },
    ) => Promise<ApolloQueryResult<TFetchData>>
}
