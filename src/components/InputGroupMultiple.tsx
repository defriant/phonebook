import { Center, Flex, Grid, Icon, Input, SlideFade, Stack, StackDivider, Text, useDisclosure } from '@chakra-ui/react'
import { SetStateAction, Dispatch } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

export type inputMultipleType = { value: string }

type InputGroupMultipleProps = {
    icon: any
    placeholder: string
    values: inputMultipleType[]
    setValues: Dispatch<SetStateAction<inputMultipleType[]>>
}

function InputGroupMultiple({ icon, placeholder, values, setValues }: InputGroupMultipleProps) {
    const { isOpen: isShowAddMore, onOpen: onShowAddMore, onClose: onCloseAddMore } = useDisclosure()

    return (
        <Stack
            borderWidth='1px'
            py='.5rem'
            pl='.5rem'
            pr='1.25rem'
            borderRadius='2xl'
        >
            <Grid
                templateColumns='40px 1fr'
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
                <Stack
                    divider={<StackDivider />}
                    spacing='.25rem'
                >
                    {values.map((v: inputMultipleType, i: number) => (
                        <Grid
                            key={i}
                            templateColumns='1fr auto'
                            alignItems='center'
                        >
                            <Input
                                variant='unstyled'
                                h='30px'
                                px='.25rem'
                                fontSize='sm'
                                placeholder={placeholder}
                                autoComplete='none'
                                value={v.value}
                                onChange={e =>
                                    setValues((prev: inputMultipleType[]) => {
                                        const next = [...prev]
                                        next[i].value = e.target.value
                                        return next
                                    })
                                }
                                onFocus={() => v.value.length === 0 && onShowAddMore()}
                                onBlur={() => v.value.length === 0 && onCloseAddMore()}
                            />
                            {values.length > 1 && (
                                <Icon
                                    as={AiOutlineMinus}
                                    color='red.500'
                                    cursor='pointer'
                                    onClick={() =>
                                        setValues((prev: inputMultipleType[]) => {
                                            const next = [...prev]
                                            next.splice(i, 1)
                                            return next
                                        })
                                    }
                                />
                            )}
                        </Grid>
                    ))}
                </Stack>
            </Grid>

            <SlideFade
                in={values.length > 1 ? true : isShowAddMore}
                reverse={false}
                unmountOnExit={true}
                style={{
                    borderTopWidth: '1px',
                }}
            >
                <Flex
                    align='center'
                    color='textLighter'
                    _hover={{
                        color: 'primary',
                    }}
                    cursor='pointer'
                    w='max-content'
                    mt='.5rem'
                    onClick={() => {
                        setValues((prev: inputMultipleType[]) => [...prev, { value: '' }])
                    }}
                >
                    <Center
                        h='30px'
                        w='40px'
                    >
                        <Icon
                            as={AiOutlinePlus}
                            fontSize='14px'
                            transitionDuration='normal'
                        />
                    </Center>
                    <Text
                        fontSize='xs'
                        fontWeight='medium'
                        transitionDuration='normal'
                    >
                        Add {placeholder.toLowerCase()}
                    </Text>
                </Flex>
            </SlideFade>
        </Stack>
    )
}

export default InputGroupMultiple
