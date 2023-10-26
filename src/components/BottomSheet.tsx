import { Container, Fade, Slide } from '@chakra-ui/react'
import { ReactNode, useEffect } from 'react'

type BottomSheetProps = {
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    height?: 'full' | 'auto'
}

function BottomSheet({ children, isOpen, onClose, height = 'auto' }: BottomSheetProps) {
    useEffect(() => {
        console.log(isOpen)
    }, [isOpen])

    return (
        <>
            {height !== 'full' && (
                <Container
                    as={Fade}
                    in={isOpen}
                    unmountOnExit={true}
                    pos='fixed'
                    top='0'
                    right='0'
                    bottom='0'
                    left='0'
                    bg='rgba(0, 0, 0, .5)'
                    backdropFilter='blur(3px)'
                    onClick={onClose}
                    zIndex='overlay'
                />
            )}

            <Slide
                in={isOpen}
                unmountOnExit={true}
                direction='bottom'
                style={{
                    zIndex: 1310,
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
