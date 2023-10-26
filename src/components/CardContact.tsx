import { Avatar, Grid, Icon, Stack, Text } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'

type CardContactProps = {
    isFavorite?: boolean
}

function CardContact({ isFavorite }: CardContactProps) {
    return (
        <Grid
            templateColumns='50px 1fr auto'
            bg='white'
            boxShadow='card'
            borderRadius='12px'
            p='1rem'
            gap='1rem'
            alignItems='center'
        >
            <Avatar
                name='Nayla Intan'
                w='40px'
                h='40px'
                size='sm'
                overflow='visible'
            />
            <Stack spacing='0'>
                <Text
                    fontWeight='semibold'
                    fontSize='sm'
                >
                    Afif Defriant
                </Text>
                <Text fontSize='xs'>+6281314957058</Text>
            </Stack>
            {isFavorite && (
                <Icon
                    as={BsHeartFill}
                    color='red.400'
                />
            )}
        </Grid>
    )
}

export default CardContact
