import { Box, Icon, Link, Text } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'
import AnimateScreen from '../components/AnimateScreen'
import { useLayoutEffect } from 'react'
import AnimateScreenHeader from '../components/AnimateScreenHeader'
import AnimateScreenBody from '../components/AnimateScreenBody'

function DetailContact() {
    useLayoutEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

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
                >
                    <Icon
                        as={FaArrowLeft}
                        fontSize='22px'
                    />
                </Link>
                <Box />
            </AnimateScreenHeader>

            <AnimateScreenBody>
                <Text>Contact detail here</Text>
            </AnimateScreenBody>
        </AnimateScreen>
    )
}

export default DetailContact
