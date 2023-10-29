import { useEffect, useState, useContext } from 'react'
import { TContactDetail } from '../pages/DetailContact'
import { Button, Flex, Icon, Stack, Text, UseDisclosureProps, useToast } from '@chakra-ui/react'
import BottomSheet from './BottomSheet'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import InputGroup from './InputGroup'
import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client'
import { EditContactById } from '../gql/mutations'
import { FavoritesContext } from '../contexts/FavoriteContactProvider'

type EditContactProps = {
    data: TContactDetail
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<TContactDetail>>
}

function EditContact({ isOpen, onClose, data, refetch }: UseDisclosureProps & EditContactProps) {
    const [firstName, setFirstName] = useState(data?.contact_by_pk.first_name ?? '')
    const [lastName, setLastName] = useState(data?.contact_by_pk.last_name ?? '')
    const { favorites, updateFavorite } = useContext(FavoritesContext)

    useEffect(() => {
        setFirstName(data?.contact_by_pk.first_name ?? '')
        setLastName(data?.contact_by_pk.last_name ?? '')
    }, [isOpen])

    const toast = useToast()

    const [editContact, { loading }] = useMutation(EditContactById, {
        onCompleted: res => {
            toast.closeAll()
            toast({
                status: 'success',
                title: 'Success',
                description: `${res.update_contact_by_pk.first_name} ${res.update_contact_by_pk.last_name} has been updated`,
                position: 'top',
                duration: 3000,
                isClosable: true,
                containerStyle: {
                    fontSize: 'sm',
                },
            })

            if (favorites?.find(fav => fav.id === data.contact_by_pk.id))
                updateFavorite!(data.contact_by_pk.id, {
                    id: res.update_contact_by_pk.id,
                    first_name: res.update_contact_by_pk.first_name,
                    last_name: res.update_contact_by_pk.last_name,
                    phones: res.update_contact_by_pk.phones,
                })

            onClose!()
            refetch()
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
                h='40vh'
                p='1.5rem'
                spacing='1.5rem'
            >
                <Flex
                    align='flex-start'
                    justify='space-between'
                    gap='3rem'
                >
                    <Text fontWeight='semibold'>
                        Edit contact {data?.contact_by_pk.first_name} {data?.contact_by_pk.last_name}
                    </Text>
                    <Icon
                        as={AiOutlineClose}
                        fontSize='20px'
                        cursor='pointer'
                        opacity='.5'
                        _hover={{
                            opacity: '1',
                        }}
                        transitionDuration='normal'
                        onClick={onClose}
                    />
                </Flex>
                <Stack spacing='.75rem'>
                    <InputGroup
                        icon={AiOutlineUser}
                        placeholder='First name'
                        value={firstName}
                        onChange={e => {
                            if (/[^a-zA-Z\d\s]/gm.test(e.target.value)) return
                            setFirstName(e.target.value)
                        }}
                    />
                    <InputGroup
                        icon={AiOutlineUser}
                        placeholder='Last name'
                        value={lastName}
                        onChange={e => {
                            if (/[^a-zA-Z\d\s]/gm.test(e.target.value)) return
                            setLastName(e.target.value)
                        }}
                    />
                </Stack>

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
                        onClick={() => {
                            if (firstName.replaceAll(' ', '').length === 0) return
                            if (lastName.replaceAll(' ', '').length === 0) return
                            if (data?.contact_by_pk.id)
                                editContact({
                                    variables: {
                                        id: data.contact_by_pk.id,
                                        _set: {
                                            first_name: firstName,
                                            last_name: lastName,
                                        },
                                    },
                                })
                        }}
                    >
                        Save
                    </Button>
                </Flex>
            </Stack>
        </BottomSheet>
    )
}

export default EditContact
