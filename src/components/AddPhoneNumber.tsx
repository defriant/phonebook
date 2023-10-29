import { useContext, useEffect, useState } from 'react'
import Modal from './Modal'
import { Box, Button, Flex, Icon, Stack, Text, UseDisclosureProps, useToast } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlinePhone } from 'react-icons/ai'
import InputGroup from './InputGroup'
import { TContactDetail } from '../pages/DetailContact'
import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/client'
import { AddNumberToContact } from '../gql/mutations'
import { FavoritesContext } from '../contexts/FavoriteContactProvider'
import { ContactContext } from '../contexts/ContactProvider'

type AddPhoneNumberProps = {
    data: TContactDetail
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<TContactDetail>>
}

function AddPhoneNumber({ isOpen, onClose, data, refetch }: UseDisclosureProps & AddPhoneNumberProps) {
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [isValid, setIsValid] = useState(false)
    const { updateFavorite } = useContext(FavoritesContext)
    const { refetch: refetchContactList } = useContext(ContactContext)

    useEffect(() => {
        let valid = true
        if (phoneNumber.replaceAll(' ', '').length === 0) valid = false
        setIsValid(valid)
    }, [phoneNumber])

    const toast = useToast()
    const [addNumber, { loading }] = useMutation(AddNumberToContact, {
        onCompleted: res => {
            toast.closeAll()
            toast({
                status: 'success',
                title: 'Success',
                description: `Phone number has been added`,
                position: 'top',
                duration: 3000,
                isClosable: true,
                containerStyle: {
                    fontSize: 'sm',
                },
            })

            updateFavorite!(res.insert_phone.returning[0].contact.id, {
                id: res.insert_phone.returning[0].contact.id,
                first_name: res.insert_phone.returning[0].contact.first_name,
                last_name: res.insert_phone.returning[0].contact.last_name,
                phones: res.insert_phone.returning[0].contact.phones,
            })
            onClose!()
            refetch!()
            refetchContactList!()
        },
        onError: err => {
            toast.closeAll()
            if (err.message.includes('phone_number_key'))
                return toast({
                    status: 'warning',
                    description: 'The phone number already exists',
                    position: 'bottom',
                    duration: 3000,
                    isClosable: true,
                    containerStyle: {
                        fontSize: 'sm',
                    },
                })

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
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Box
                p='1rem'
                px='2rem'
                bg='white'
                borderRadius='6px'
                w={{
                    base: '100%',
                    md: '500px',
                }}
                maxW='500px'
            >
                <Flex
                    justify='space-between'
                    align='flex-start'
                    mb='2rem'
                >
                    <Text
                        fontSize='sm'
                        fontWeight='semibold'
                    >
                        Add phone number
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
                <Stack spacing='2rem'>
                    <InputGroup
                        icon={AiOutlinePhone}
                        placeholder='Phone number'
                        type='number'
                        autoFocus={true}
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <Button
                        colorScheme='green'
                        isDisabled={!isValid}
                        isLoading={loading}
                        onClick={() =>
                            addNumber({
                                variables: {
                                    contact_id: data.contact_by_pk.id,
                                    phone_number: phoneNumber,
                                },
                            })
                        }
                    >
                        Add
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default AddPhoneNumber
