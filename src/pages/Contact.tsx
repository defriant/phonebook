import { Box, Container, Flex, Icon, Stack, Text, useDisclosure } from '@chakra-ui/react'
import Wrapper from '../components/Wrapper'
import CardContact from '../components/CardContact'
import { FaPlusCircle, FaTimes } from 'react-icons/fa'
import BottomSheet from '../components/BottomSheet'
import { motion } from 'framer-motion'

function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Container
                as={Flex}
                pos='fixed'
                top='0'
                left='0'
                right='0'
                h='80px'
                align='center'
                justify='space-between'
                zIndex='2'
            >
                <Text
                    fontWeight='semibold'
                    fontSize='xl'
                >
                    Contact
                </Text>

                <Icon
                    as={FaPlusCircle}
                    fontSize='25px'
                    color='primary'
                    cursor='pointer'
                    _hover={{
                        color: 'primaryDarker',
                    }}
                    transitionDuration='normal'
                    onClick={onOpen}
                />
            </Container>

            <Wrapper>
                <Stack
                    spacing='2rem'
                    mt='80px'
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
            </Wrapper>

            <BottomSheet
                isOpen={isOpen}
                onClose={onClose}
                height='full'
            >
                <Icon
                    as={FaTimes}
                    fontSize='22px'
                    pos='absolute'
                    top='1rem'
                    right='1rem'
                    onClick={onClose}
                />
            </BottomSheet>
        </>
    )
}

export default Home
