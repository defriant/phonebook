import { Box, Container, Flex, Icon, Link, Stack, Text } from '@chakra-ui/react'
import CardContact from '../components/CardContact'
import { FaPlusCircle } from 'react-icons/fa'
import { Outlet, Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'

function Home() {
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
                <Stack spacing='1rem'>
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
                </Stack>
            </Stack>

            <Outlet />
        </Container>
    )
}

export default Home
