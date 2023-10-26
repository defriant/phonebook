import { Button, Icon } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'

type ButtonIconProps = {
    icon: any
    size?: string
    fontSize?: string
    onClick?: MouseEventHandler
}

function ButtonIcon({ icon, size, fontSize, onClick }: ButtonIconProps) {
    return (
        <Button
            variant='ghost'
            role='group'
            onClick={onClick}
            size={size}
        >
            <Icon
                as={icon}
                fontSize={fontSize}
                color='text-lighter'
                _groupHover={{
                    color: 'chakra-body-text',
                }}
                transitionDuration='normal'
            />
        </Button>
    )
}

export default ButtonIcon
