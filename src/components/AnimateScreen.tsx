import { Box, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type AnimateScreenProps = {
    initial?: any
    animate?: any
    exit?: any
    children: ReactNode
}

function AnimateScreen({ initial, animate, exit, children }: AnimateScreenProps) {
    return (
        <Box
            as={motion.div}
            pos='fixed'
            top='0'
            left='0'
            right='0'
            bottom='0'
            initial={initial}
            animate={animate}
            exit={exit}
            zIndex='overlay'
        >
            <Container
                h='100vh'
                overflow='auto'
            >
                {children}
            </Container>
        </Box>
    )
}

export default AnimateScreen
