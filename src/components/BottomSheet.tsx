import { Box, Container, Fade, Slide } from '@chakra-ui/react'
import { ReactNode } from 'react'

type BottomSheetProps = {
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    height?: 'full' | 'auto'
}

function BottomSheet({ children, isOpen, onClose, height = 'auto' }: BottomSheetProps) {
    return (
        <>
            {height !== 'full' && (
                <Box
                    as={Fade}
                    in={isOpen}
                    unmountOnExit={true}
                    pos='fixed'
                    top='0'
                    left='0'
                    right='0'
                    bottom='0'
                    w='body-width'
                    backdropFilter='blur(3px)'
                    onClick={onClose}
                    zIndex='modal'
                >
                    <Container
                        h='100vh'
                        bg='rgba(0, 0, 0, .5)'
                    />
                </Box>
            )}

            <Slide
                in={isOpen}
                unmountOnExit={true}
                direction='bottom'
                style={{
                    width: 'var(--chakra-sizes-body-width)',
                    zIndex: 1400,
                }}
            >
                <Container
                    pos='relative'
                    h={height === 'full' ? '100vh' : 'max-content'}
                    px='0'
                    borderTopRightRadius={height !== 'full' ? '20px' : 'none'}
                    borderTopLeftRadius={height !== 'full' ? '20px' : 'none'}
                >
                    {children}
                </Container>
            </Slide>
        </>
    )
}

export default BottomSheet
