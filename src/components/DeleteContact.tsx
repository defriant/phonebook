import { useContext } from 'react'
import { TContactDetail } from '../pages/DetailContact'
import { useMutation } from '@apollo/client'
import { Button, Center, Flex, Icon, Stack, Text, UseDisclosureProps, useToast } from '@chakra-ui/react'
import BottomSheet from './BottomSheet'
import { AiOutlineClose, AiOutlineInfoCircle } from 'react-icons/ai'
import { FavoritesContext } from '../contexts/FavoriteContactProvider'
import { DeleteContactById } from '../gql/mutations'
import { ContactContext } from '../contexts/ContactProvider'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../routes/path'

type EditContactProps = {
    data: TContactDetail
}

function DeleteContact({ isOpen, onClose, data }: EditContactProps & UseDisclosureProps) {
    const { removeFavorite } = useContext(FavoritesContext)
    const { refetch } = useContext(ContactContext)
    const toast = useToast()
    const navigate = useNavigate()

    const [deleteContact, { loading }] = useMutation(DeleteContactById, {
        onCompleted: res => {
            toast.closeAll()
            toast({
                status: 'success',
                title: 'Success',
                description: `${res.delete_contact_by_pk.first_name} ${res.delete_contact_by_pk.last_name} has been deleted from contact`,
                position: 'top',
                duration: 3000,
                isClosable: true,
                containerStyle: {
                    fontSize: 'sm',
                },
            })

            removeFavorite!(res.delete_contact_by_pk.id)
            onClose!()
            navigate(PATH.contact)
            refetch!()
        },
        onError: err => {
            toast.closeAll()

            toast({
                status: 'error',
                title: 'Failed',
                description: err.message,
                position: 'bottom',
                duration: 3000,
                isClosable: true,
                containerStyle: {
                    fontSize: 'sm',
                },
            })
        },
    })

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
        >
            <Stack
                p='1.5rem'
                spacing='1.5rem'
            >
                <Flex
                    align='flex-start'
                    justify='space-between'
                    gap='3rem'
                >
                    <Icon
                        as={AiOutlineClose}
                        fontSize='20px'
                        cursor='pointer'
                        opacity='.5'
                        ml='auto'
                        _hover={{
                            opacity: '1',
                        }}
                        transitionDuration='normal'
                        onClick={onClose}
                    />
                </Flex>
                <Center
                    h='100px'
                    px='1.5rem'
                >
                    <Stack
                        align='center'
                        spacing='1rem'
                    >
                        <Icon
                            as={AiOutlineInfoCircle}
                            fontSize='30px'
                            color='orange.500'
                        />
                        <Text align='center'>
                            Delete{' '}
                            <Text
                                as='span'
                                fontWeight='bold'
                            >
                                {data?.contact_by_pk.first_name} {data?.contact_by_pk.last_name}
                            </Text>{' '}
                            from contact?
                        </Text>
                    </Stack>
                </Center>
                <Stack spacing='.75rem'></Stack>

                <Flex
                    w='100%'
                    gap='1rem'
                    mt='auto'
                >
                    <Button
                        variant='outline'
                        w='50%'
                        colorScheme='green'
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        isLoading={loading}
                        variant='solid'
                        w='50%'
                        colorScheme='green'
                        onClick={() =>
                            deleteContact({
                                variables: {
                                    id: data.contact_by_pk.id,
                                },
                            })
                        }
                    >
                        Delete
                    </Button>
                </Flex>
            </Stack>
        </BottomSheet>
    )
}

export default DeleteContact
