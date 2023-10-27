import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

type AnimateScreenBodyProps = {
    children: ReactNode
}

function AnimateScreenBody({ children }: AnimateScreenBodyProps) {
    return (
        <Box
            pt='.5rem'
            pb='2rem'
        >
            {children}
        </Box>
    )
}

export default AnimateScreenBody
