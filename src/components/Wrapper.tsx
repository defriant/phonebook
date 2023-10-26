import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

type WrapperProps = {
    children: ReactNode
}

function Wrapper({ children }: WrapperProps) {
    return (
        <Container
            py='1.5rem'
            boxShadow='container'
            pos='relative'
        >
            {children}
        </Container>
    )
}

export default Wrapper
