import { Button, Center, Icon, Link, Stack, Text, useToast } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { Link as ReactLink, useNavigate } from 'react-router-dom'
import { PATH } from '../routes/path'
import AnimateScreen from '../components/AnimateScreen'
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import InputGroup from '../components/InputGroup'
import InputGroupMultiple, { inputMultipleType } from '../components/InputGroupMultiple'
import { useContext, useEffect, useState } from 'react'
import AnimateScreenHeader from '../components/AnimateScreenHeader'
import AnimateScreenBody from '../components/AnimateScreenBody'
import { useMutation } from '@apollo/client'
import { AddContactWithPhones } from '../gql/mutations'
import { ContactContext } from '../contexts/ContactProvider'

function AddContact() {
    const { refetch, fetchMore } = useContext(ContactContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phones, setPhones] = useState<inputMultipleType[]>([{ value: '' }])
    const [isValid, setIsValid] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (loaded) {
            document.getElementById('add-contact-first-name')?.focus()
        }
    }, [loaded])

    const [addContact, { loading }] = useMutation(AddContactWithPhones, {
        onCompleted: res => {
            toast.closeAll()
            toast({
                status: 'success',
                title: 'Success',
                description: `${res.insert_contact.returning[0].first_name} ${res.insert_contact.returning[0].last_name} has been added to contact`,
                position: 'top',
                duration: 3000,
                isClosable: true,
                containerStyle: {
                    fontSize: 'sm',
                },
            })
            navigate(PATH.contact)
            refetch!()
        },
        onError: err => {
            toast.closeAll()
            if (err.message.includes('phone_number_key'))
                return toast({
                    status: 'warning',
                    description: 'The phone number already exists in another contact',
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

    useEffect(() => {
        let valid = true

        if (firstName.replaceAll(' ', '').length === 0) valid = false
        if (lastName.replaceAll(' ', '').length === 0) valid = false
        if (!phones.find(p => p.value.replaceAll(' ', '').length > 0)) valid = false

        setIsValid(valid)
    }, [firstName, lastName, phones])

    const handleCreateContact = () => {
        console.log('click')
        fetchMore!({
            variables: {
                where: {
                    first_name: {
                        _like: firstName,
                    },
                    last_name: {
                        _like: lastName,
                    },
                },
            },
        }).then(res => {
            if (res.data.contact.length > 0)
                return toast({
                    status: 'warning',
                    description: `${firstName} ${lastName} already exist`,
                    position: 'bottom',
                    duration: 3000,
                    isClosable: true,
                    containerStyle: {
                        fontSize: 'sm',
                    },
                })

            addContact({
                variables: {
                    first_name: firstName,
                    last_name: lastName,
                    phones: phones.map(p => ({ number: p.value })),
                },
            })
        })
    }

    return (
        <AnimateScreen
            initial={{ top: '100vh' }}
            animate={{ top: '0' }}
            exit={{ top: '100vh' }}
            onAnimationComplete={(e: any) => {
                if (e.top === '0') setLoaded(true)
            }}
        >
            <AnimateScreenHeader>
                <Text fontWeight='semibold'>Add Contact</Text>
                <Link
                    as={ReactLink}
                    to={PATH.contact}
                    opacity='.5'
                    _hover={{
                        opacity: '1',
                    }}
                >
                    <Icon
                        as={FaTimes}
                        fontSize='22px'
                    />
                </Link>
            </AnimateScreenHeader>

            <AnimateScreenBody>
                <Stack spacing='2.25rem'>
                    <Stack spacing='.75rem'>
                        <InputGroup
                            id='add-contact-first-name'
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

                        <InputGroupMultiple
                            type='number'
                            icon={AiOutlinePhone}
                            placeholder='Phone number'
                            values={phones}
                            setValues={setPhones}
                        />
                    </Stack>

                    <Center>
                        <Button
                            colorScheme='green'
                            rounded='full'
                            px='2rem'
                            isDisabled={!isValid}
                            isLoading={loading}
                            onClick={handleCreateContact}
                        >
                            Save
                        </Button>
                    </Center>
                </Stack>
            </AnimateScreenBody>
        </AnimateScreen>
    )
}

export default AddContact
