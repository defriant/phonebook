import { Avatar, Grid, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'
import { Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'

type CardContactProps = {
    isFavorite?: boolean
    data: any
}

function CardContact({ isFavorite, data }: CardContactProps) {
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
                    name={`${data.first_name} ${data.last_name}`}
                    w='40px'
                    h='40px'
                    size='sm'
                    overflow='visible'
                />
                <Stack spacing='.15rem'>
                    <Text
                        fontWeight='semibold'
                        fontSize='sm'
                    >
                        {`${data.first_name} ${data.last_name}`}
                    </Text>
                    <Text fontSize='xs'>{data.phones.length > 0 && data.phones[0].number}</Text>
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
