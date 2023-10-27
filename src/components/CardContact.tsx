import { Avatar, Grid, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'
import { Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'

type CardContactProps = {
    isFavorite?: boolean
}

function CardContact({ isFavorite }: CardContactProps) {
    return (
        <Link
            as={ReactLink}
            to={PATH.detailContact}
            textDecor='none !important'
        >
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
        </Link>
    )
}

export default CardContact
