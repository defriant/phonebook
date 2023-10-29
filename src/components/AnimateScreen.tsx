import { Box, Container } from '@chakra-ui/react'
import { AnimationDefinition, motion } from 'framer-motion'
import { ReactNode, useLayoutEffect } from 'react'
import { AnimationEvent } from 'react'

type AnimateScreenProps = {
    initial?: any
    animate?: any
    exit?: any
    children: ReactNode
    onAnimationStart?: (e: AnimationEvent<HTMLDivElement>) => void
    onAnimationComplete?: (e: AnimationDefinition) => void
}

function AnimateScreen({ initial, animate, exit, children, onAnimationStart, onAnimationComplete }: AnimateScreenProps) {
    // hide body scroll when animated screen mounted (Ex: AddContact, SearchContact.. etc)
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
                    onAnimationStart={onAnimationStart}
                    onAnimationComplete={onAnimationComplete}
                >
                    {children}
                </Container>
            </Container>
        </Box>
    )
}

export default AnimateScreen
