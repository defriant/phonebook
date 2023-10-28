import { Box, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ReactNode, useLayoutEffect } from 'react'

type AnimateScreenProps = {
    initial?: any
    animate?: any
    exit?: any
    children: ReactNode
}

function AnimateScreen({ initial, animate, exit, children }: AnimateScreenProps) {
    useLayoutEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <Box
            pos='fixed'
            top='0'
            left='0'
            right='0'
            bottom='0'
            w='body-width'
            zIndex='overlay'
        >
            <Container
                pos='relative'
                h='100vh'
                overflow='hidden'
                bg='transparent'
            >
                <Container
                    pos='absolute'
                    top='0'
                    left='0'
                    bottom='0'
                    right='0'
                    as={motion.div}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    bg='white'
                    overflowY='auto'
                    h='100vh'
                >
                    {children}
                </Container>
            </Container>
        </Box>

        // <Box
        //     as={motion.div}
        //     pos='fixed'
        //     top='0'
        //     left='0'
        //     right='0'
        //     bottom='0'
        //     initial={initial}
        //     animate={animate}
        //     exit={exit}
        //     zIndex='overlay'
        // >
        //     <Container
        //         h='100vh'
        //         overflow='auto'
        //     >
        //         {children}
        //     </Container>
        // </Box>
    )
}

export default AnimateScreen
