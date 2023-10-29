import { Avatar, Box, Button, Center, Flex, Icon, Link, Spinner, Stack, Text } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link as ReactLink, useParams } from 'react-router-dom'
import { PATH } from '../routes/path'
import AnimateScreen from '../components/AnimateScreen'
import { useContext } from 'react'
import AnimateScreenHeader from '../components/AnimateScreenHeader'
import AnimateScreenBody from '../components/AnimateScreenBody'
import { AiOutlineEdit, AiOutlinePhone } from 'react-icons/ai'
import { BsHeartFill, BsTrash } from 'react-icons/bs'
import { useQuery } from '@apollo/client'
import { GetContactDetail } from '../gql/queries'
import { format } from 'date-fns'
import { FavoritesContext } from '../contexts/FavoriteContactProvider'
import { TContact } from '../contexts/ContactProvider'

type TContactDetail = {
    contact_by_pk: TContact
}

function DetailContact() {
    const params = useParams()
    const { data, loading, error } = useQuery<TContactDetail>(GetContactDetail, {
        variables: {
            id: params.id,
        },
    })
    const { favorites, setFavorite, removeFavorite } = useContext(FavoritesContext)

    return (
        <AnimateScreen
            initial={{ left: '100vw' }}
            animate={{ left: '0' }}
            exit={{ left: '100vw' }}
        >
            <AnimateScreenHeader>
                <Link
                    as={ReactLink}
                    to={PATH.contact}
                    opacity='.5'
                    _hover={{
                        opacity: '1',
                    }}
                >
                    <Icon
                        as={FaArrowLeft}
                        fontSize='22px'
                    />
                </Link>

                {!error && data && (
                    <Flex
                        align='center'
                        gap='1.5rem'
                    >
                        <Icon
                            as={AiOutlineEdit}
                            fontSize='28px'
                            color='yellow.500'
                        />
                        <Icon
                            as={BsTrash}
                            fontSize='22px'
                            color='red.600'
                        />
                    </Flex>
                )}
            </AnimateScreenHeader>

            <AnimateScreenBody>
                {loading && (
                    <Center h='50vh'>
                        <Spinner
                            w='75px'
                            h='75px'
                            color='primary'
                        />
                    </Center>
                )}

                {error && (
                    <Center h='50vh'>
                        <Stack align='center'>
                            <Text fontSize='4xl'>404</Text>
                            <Text>Not found</Text>
                        </Stack>
                    </Center>
                )}

                {!error && data && (
                    <>
                        <Box
                            h='max-content'
                            borderRadius='12px'
                            bg='#F7F7F7'
                            pos='relative'
                            mt='50px'
                            pt='calc(50px + 1rem)'
                            pb='50px'
                            mb='3rem'
                        >
                            <Center
                                pos='absolute'
                                top='-50px'
                                left='0'
                                right='0'
                            >
                                <Avatar
                                    w='100px'
                                    h='100px'
                                    name={`${data.contact_by_pk.first_name} ${data.contact_by_pk.last_name}`}
                                    boxShadow='lg'
                                />
                            </Center>

                            <Stack
                                align='center'
                                spacing='1.5rem'
                            >
                                <Text
                                    fontWeight='medium'
                                    fontSize='lg'
                                >
                                    {data.contact_by_pk.first_name} {data.contact_by_pk.last_name}
                                </Text>

                                <Stack
                                    spacing='.5rem'
                                    w='100%'
                                    align='center'
                                >
                                    {data.contact_by_pk.phones.map((phone: any, i: number) => (
                                        <Flex
                                            key={i}
                                            align='center'
                                            gap='.5rem'
                                            pr='1rem'
                                        >
                                            <Icon
                                                as={AiOutlinePhone}
                                                fontSize='24px'
                                                color='primaryDarker'
                                            />
                                            <Text>{phone.number}</Text>
                                        </Flex>
                                    ))}
                                </Stack>

                                <Box />

                                <Stack
                                    align='center'
                                    fontSize='sm'
                                    spacing='.15rem'
                                >
                                    <Text>Created at</Text>
                                    <Text>{format(new Date(data.contact_by_pk.created_at), 'dd MMMM, Y HH:mm')}</Text>
                                </Stack>
                            </Stack>
                        </Box>

                        <Center>
                            {favorites?.find(fav => fav.id === data.contact_by_pk.id) ? (
                                <Button
                                    rounded='full'
                                    fontWeight='medium'
                                    variant='outline'
                                    colorScheme='green'
                                    leftIcon={<Icon as={BsHeartFill} />}
                                    onClick={() => removeFavorite!(data.contact_by_pk.id)}
                                >
                                    Remove from favorite
                                </Button>
                            ) : (
                                <Button
                                    rounded='full'
                                    fontWeight='medium'
                                    variant='solid'
                                    colorScheme='green'
                                    leftIcon={<Icon as={BsHeartFill} />}
                                    onClick={() =>
                                        setFavorite!({
                                            id: data.contact_by_pk.id,
                                            first_name: data.contact_by_pk.first_name,
                                            last_name: data.contact_by_pk.last_name,
                                            phones: data.contact_by_pk.phones.map(phone => ({ number: phone.number })),
                                        })
                                    }
                                >
                                    Add to favorite
                                </Button>
                            )}
                        </Center>
                    </>
                )}
            </AnimateScreenBody>
        </AnimateScreen>
    )
}

export default DetailContact
