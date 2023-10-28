import { Box, Center, Container, Flex, Icon, Link, Spinner, Stack, Text } from '@chakra-ui/react'
import { FaChevronDown, FaPlusCircle } from 'react-icons/fa'
import { Outlet, Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'
import { useQuery } from '@apollo/client'
import { GetContactList } from '../gql/queries'
import { createContext, useState, useEffect } from 'react'
import ContactList from '../components/ContactList'
import { ApolloQueryType } from '../gql/apolloConfig'
import PageLoader from '../components/PageLoader'

export type TContact = {
    __typename: string
    id: number
    first_name: string
    last_name: string
    phones: {
        __typename: string
        number: string
    }[]
}

type TGetContact = {
    contact: TContact[]
}

type TGetContactVariables = {
    where?: any
    order_by?: any
    limit?: number
    offset?: number
}

export const ContactContext = createContext<ApolloQueryType<TGetContact, TGetContactVariables>>({})

const ContactListBaseVar = {
    order_by: {
        first_name: 'asc',
    },
    offset: 0,
    limit: 10,
}

function Home() {
    const { data, error, loading, refetch, fetchMore } = useQuery<TGetContact>(GetContactList, {
        variables: ContactListBaseVar,
    })
    const [showLoadMore, setShowLoadMore] = useState(false)
    const [isLoadMore, setIsLoadMore] = useState(false)

    useEffect(() => {
        if (data?.contact && data.contact.length % ContactListBaseVar.limit === 0) {
            setShowLoadMore(true)
        } else {
            setShowLoadMore(false)
        }
    }, [data])

    if (loading) return <PageLoader />

    return (
        <ContactContext.Provider value={{ data, error, loading, refetch }}>
            <Container
                py='1.5rem'
                boxShadow='container'
                pos='relative'
                minH='100vh'
            >
                <Box
                    pos='fixed'
                    top='0'
                    left='0'
                    w='body-width'
                    zIndex='sticky'
                >
                    <Container h='header-height'>
                        <Flex
                            align='center'
                            justify='space-between'
                            h='100%'
                        >
                            <Text
                                fontWeight='semibold'
                                fontSize='xl'
                            >
                                Contact
                            </Text>

                            <Link
                                as={ReactLink}
                                to={PATH.addContact}
                            >
                                <Icon
                                    as={FaPlusCircle}
                                    fontSize='25px'
                                    color='primary'
                                    cursor='pointer'
                                    _hover={{
                                        color: 'primaryDarker',
                                    }}
                                    transitionDuration='normal'
                                />
                            </Link>
                        </Flex>
                    </Container>
                </Box>

                <Stack
                    mt='header-height'
                    py='.5rem'
                    spacing='2rem'
                >
                    {/* <Stack spacing='1rem'>
                        <Text
                            fontSize='sm'
                            fontWeight='semibold'
                            pos='sticky'
                        >
                            Favorite
                        </Text>
                        <Stack spacing='.75rem'>
                            <CardContact isFavorite />
                            <CardContact isFavorite />
                            <CardContact isFavorite />
                        </Stack>
                    </Stack>

                    <Stack spacing='1rem'>
                        <Text
                            fontSize='sm'
                            fontWeight='semibold'
                        >
                            All Contact
                        </Text>
                        <Text
                            fontSize='sm'
                            fontWeight='semibold'
                        >
                            A
                        </Text>
                        <Stack spacing='.75rem'>
                            <CardContact />
                            <CardContact />
                            <CardContact />
                            <CardContact />
                            <CardContact />
                        </Stack>
                        <Text
                            fontSize='sm'
                            fontWeight='semibold'
                        >
                            B
                        </Text>
                        <Stack spacing='.75rem'>
                            <CardContact />
                            <CardContact />
                            <CardContact />
                            <CardContact />
                            <CardContact />
                        </Stack>
                    </Stack> */}

                    <Stack spacing='1rem'>
                        <ContactList />
                    </Stack>

                    {showLoadMore && (
                        <Center>
                            {isLoadMore ? (
                                <Spinner
                                    h='25px'
                                    w='25px'
                                    color='primary'
                                />
                            ) : (
                                <Flex
                                    gap='1rem'
                                    align='center'
                                    color='primary'
                                    _hover={{
                                        color: 'primaryDarker',
                                    }}
                                    transitionDuration='normal'
                                    cursor='pointer'
                                    h='25px'
                                    onClick={() => {
                                        setIsLoadMore(true)
                                        fetchMore({
                                            variables: {
                                                offset: data?.contact.length,
                                            },
                                            updateQuery: (prev, { fetchMoreResult }) => {
                                                setIsLoadMore(false)

                                                if (fetchMoreResult.contact.length === 0) {
                                                    setShowLoadMore(false)
                                                    return prev
                                                }

                                                return {
                                                    ...prev,
                                                    contact: [...prev.contact, ...fetchMoreResult.contact],
                                                }
                                            },
                                        })
                                    }}
                                >
                                    <Icon as={FaChevronDown} />
                                    <Text
                                        fontSize='sm'
                                        fontWeight='medium'
                                    >
                                        Load more
                                    </Text>
                                </Flex>
                            )}
                        </Center>
                    )}
                </Stack>

                <Outlet />
            </Container>
        </ContactContext.Provider>
    )
}

export default Home
