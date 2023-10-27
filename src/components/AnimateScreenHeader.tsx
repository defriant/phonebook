import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

type AnimateScreenHeaderProps = {
    children: ReactNode
}

function AnimateScreenHeader({ children }: AnimateScreenHeaderProps) {
    return (
        <Flex
            h='header-height'
            align='center'
            justify='space-between'
            mb='1.5rem'
        >
            {children}
        </Flex>
    )
}

export default AnimateScreenHeader
