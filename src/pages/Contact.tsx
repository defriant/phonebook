import { Box, Center, Container, Flex, Icon, Link, Spinner, Stack, Text } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa'
import { Outlet, Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'
import { useState, useContext, useEffect } from 'react'
import ContactList from '../components/ContactList'
import PageLoader from '../components/PageLoader'
import { ContactContext, ContactListBaseVar } from '../contexts/ContactProvider'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'

// prevent scroll back to top
export const scrollFix = () => {
    if (window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight) {
        window.scrollTo(0, window.scrollY - 0.1)
    }
}

function Contact() {
    const { data, loading, fetchMore } = useContext(ContactContext)

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

                        <Flex
                            align='center'
                            gap='1rem'
                        >
                            <Link
                                as={ReactLink}
                                to={PATH.searchContact}
                                onClick={scrollFix}
                            >
                                <Icon
                                    as={AiOutlineSearch}
                                    fontSize='28px'
                                    color='chakra-body-text'
                                    opacity='.5'
                                    cursor='pointer'
                                    _hover={{
                                        opacity: '1',
                                    }}
                                    transitionDuration='normal'
                                />
                            </Link>

                            <Link
                                as={ReactLink}
                                to={PATH.addContact}
                                onClick={scrollFix}
                            >
                                <Icon
                                    as={AiOutlinePlus}
                                    fontSize='28px'
                                    color='chakra-body-text'
                                    opacity='.5'
                                    cursor='pointer'
                                    _hover={{
                                        opacity: '1',
                                    }}
                                    transitionDuration='normal'
                                />
                            </Link>
                        </Flex>
                    </Flex>
                </Container>
            </Box>

            <Stack
                mt='header-height'
                py='.5rem'
                spacing='2rem'
            >
                <ContactList />

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
                                    fetchMore!({
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
    )
}

export default Contact
