import { Button, Center, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa'
import { Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'
import AnimateScreen from '../components/AnimateScreen'
import { AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import InputGroup from '../components/InputGroup'
import InputGroupMultiple, { inputMultipleType } from '../components/InputGroupMultiple'
import { useLayoutEffect, useState } from 'react'
import AnimateScreenHeader from '../components/AnimateScreenHeader'
import AnimateScreenBody from '../components/AnimateScreenBody'

function AddContact() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phones, setPhones] = useState<inputMultipleType[]>([{ value: '' }])

    useLayoutEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <AnimateScreen
            initial={{ top: '100vh' }}
            animate={{ top: '0' }}
            exit={{ top: '100vh' }}
        >
            <AnimateScreenHeader>
                <Text fontWeight='semibold'>Add Contact</Text>
                <Link
                    as={ReactLink}
                    to={PATH.contact}
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
                            icon={AiOutlineUser}
                            placeholder='First name'
                            value={firstName}
                            setValue={setFirstName}
                        />

                        <InputGroup
                            icon={AiOutlineUser}
                            placeholder='Last name'
                            value={lastName}
                            setValue={setLastName}
                        />

                        <InputGroupMultiple
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
