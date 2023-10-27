import { Center, Grid, Icon, Input } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

type InputGroupProps = {
    icon: any
    placeholder: string
    value: string
    setValue: Dispatch<SetStateAction<string>>
}

function InputGroup({ icon, placeholder, value, setValue }: InputGroupProps) {
    return (
        <Grid
            templateColumns='40px 1fr'
            borderWidth='1px'
            py='.5rem'
            pl='.5rem'
            pr='1.25rem'
            borderRadius='2xl'
            role='group'
        >
            <Center h='30px'>
                <Icon
                    as={icon}
                    fontSize='18px'
                    color='textLighter'
                    _groupFocusWithin={{
                        color: 'primary',
                    }}
                    transitionDuration='normal'
                />
            </Center>
            <Input
                variant='unstyled'
                h='30px'
                px='.25rem'
                fontSize='sm'
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                autoComplete='none'
            />
        </Grid>
    )
}

export default InputGroup
