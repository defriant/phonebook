import { Center, Grid, Icon, Input, InputProps } from '@chakra-ui/react'
import { ChangeEventHandler } from 'react'

type InputGroupProps = {
    type?: string
    icon: any
    placeholder: string
    value?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    autoFocus?: boolean
}

function InputGroup({ type, icon, placeholder, value, onChange, ...inputProps }: InputGroupProps & InputProps) {
    return (
        <Grid
            templateColumns='40px 1fr'
            borderWidth='1px'
            py='.5rem'
            pl='.5rem'
            pr='1.25rem'
            borderRadius='2xl'
            role='group'
            bg='#FBFBFB'
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
                type={type ?? 'text'}
                variant='unstyled'
                h='30px'
                px='.25rem'
                fontSize='sm'
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete='none'
                {...inputProps}
            />
        </Grid>
    )
}

export default InputGroup
