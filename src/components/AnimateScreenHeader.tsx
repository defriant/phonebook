import { Divider, Flex, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

type AnimateScreenHeaderProps = {
    children: ReactNode
}

function AnimateScreenHeader({ children }: AnimateScreenHeaderProps) {
    return (
        <Stack>
            <Flex
                h='header-height'
                align='center'
                justify='space-between'
            >
                {children}
            </Flex>
            <Divider mb='1.5rem' />
        </Stack>
    )
}

export default AnimateScreenHeader
