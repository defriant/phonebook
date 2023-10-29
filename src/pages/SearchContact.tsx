import AnimateScreen from '../components/AnimateScreen'
import AnimateScreenHeader from '../components/AnimateScreenHeader'
import AnimateScreenBody from '../components/AnimateScreenBody'
import { Icon, Link, Text } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'
import { FaTimes } from 'react-icons/fa'
import InputGroup from '../components/InputGroup'
import { AiOutlineSearch } from 'react-icons/ai'
import { useEffect, useState } from 'react'

function SearchContact() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (loaded) {
            document.getElementById('search-contact')?.focus()
        }
    }, [loaded])

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
                <Text fontWeight='semibold'>Find in Contact</Text>

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
                <InputGroup
                    id='search-contact'
                    icon={AiOutlineSearch}
                    placeholder='Contact name'
                />
            </AnimateScreenBody>
        </AnimateScreen>
    )
}

export default SearchContact
