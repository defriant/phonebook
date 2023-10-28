import { Center, Container, Spinner } from '@chakra-ui/react'

function PageLoader() {
    return (
        <Container
            pos='fixed'
            top='0'
            right='0'
            bottom='0'
            left='0'
            boxShadow='container'
        >
            <Center
                w='100%'
                h='100vh'
            >
                <Spinner
                    w='75px'
                    h='75px'
                    color='primary'
                />
            </Center>
        </Container>
    )
}

export default PageLoader
