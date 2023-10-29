import AnimateScreen from '../components/AnimateScreen'
import AnimateScreenHeader from '../components/AnimateScreenHeader'
import AnimateScreenBody from '../components/AnimateScreenBody'
import { Alert, AlertIcon, Center, Icon, Link, Spinner, Stack, Text } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { PATH } from '../routes/path'
import { FaTimes } from 'react-icons/fa'
import InputGroup from '../components/InputGroup'
import { AiOutlineSearch } from 'react-icons/ai'
import { useEffect, useState, useContext } from 'react'
import { ContactContext, TContact } from '../contexts/ContactProvider'
import CardContact from '../components/CardContact'
import { FavoritesContext } from '../contexts/FavoriteContactProvider'
import { scrollFix } from './Contact'

function SearchContact() {
    const { fetchMore } = useContext(ContactContext)
    const { favorites } = useContext(FavoritesContext)
    const [loaded, setLoaded] = useState(false)
    const [input, setInput] = useState('')
    const [keywords, setKeywords] = useState('')
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchResult, setSearchResult] = useState<TContact[] | null>(null)

    useEffect(() => {
        if (loaded) {
            document.getElementById('search-contact')?.focus()
        }
    }, [loaded])

    useEffect(() => {
        const timeOut = setTimeout(() => setKeywords(input), 500)
        return () => clearTimeout(timeOut)
    }, [input])

    useEffect(() => {
        if (keywords.replaceAll(' ', '')) {
            setIsSearching(true)
            const splitKeyword = keywords.split(' ')
            const pruneKeyword = splitKeyword.filter(v => v !== '')
            const first = pruneKeyword[0]
            const second = pruneKeyword
                .filter(v => v !== first)
                .toString()
                .replaceAll(',', ' ')

            let searchResult: TContact[] = []

            fetchMore!({
                variables: {
                    limit: 100,
                    offset: 0,
                    where: {
                        first_name: {
                            _like: `%${first}%`,
                        },
                    },
                },
            }).then(res => {
                searchResult = [...res.data.contact]

                fetchMore!({
                    variables: {
                        limit: 100,
                        offset: 0,
                        where: {
                            last_name: {
                                _like: `%${second.length === 0 ? first : second}%`,
                            },
                        },
                    },
                }).then(res => {
                    const filteredRes = res.data.contact.filter(v => !searchResult.find(s => s.id === v.id))
                    searchResult = [...searchResult, ...filteredRes]
                    setIsSearching(false)
                    setSearchResult(searchResult)
                })
            })
        } else {
            setSearchResult(null)
        }
    }, [keywords])

    return (
        <AnimateScreen
            initial={{ top: '100vh' }}
            animate={{ top: '0' }}
            exit={{ top: '100vh' }}
            onAnimationComplete={(e: any) => {
                if (e.top === '0') setLoaded(true)
            }}
        >
            <AnimateScreenHeader>
                <Text fontWeight='semibold'>Find in Contact</Text>

                <Link
                    as={ReactLink}
                    to={PATH.contact}
                    opacity='.5'
                    _hover={{
                        opacity: '1',
                    }}
                    onClick={scrollFix}
                >
                    <Icon
                        as={FaTimes}
                        fontSize='22px'
                    />
                </Link>
            </AnimateScreenHeader>

            <AnimateScreenBody>
                <InputGroup
                    id='search-contact'
                    icon={AiOutlineSearch}
                    placeholder='Contact name'
                    onChange={e => setInput(e.target.value)}
                />
                <Text
                    fontSize='xs'
                    mt='.5rem'
                    px='.3rem'
                    fontStyle='italic'
                >
                    You can search by first name or last name or even both, but it's cAsE SeNsItIvE
                </Text>
                {isSearching && (
                    <Center h='30vh'>
                        <Spinner
                            w='50px'
                            h='50px'
                            color='primary'
                        />
                    </Center>
                )}

                {!isSearching && searchResult && searchResult.length === 0 && (
                    <Center h='30vh'>
                        <Alert
                            status='info'
                            w='max-content'
                            borderRadius='8px'
                        >
                            <AlertIcon />
                            <Text
                                fontSize='sm'
                                fontWeight='medium'
                            >
                                You don't have any contact with name {keywords}
                            </Text>
                        </Alert>
                    </Center>
                )}

                {!isSearching && searchResult && searchResult.length > 0 && (
                    <Stack
                        spacing='.75rem'
                        mt='2rem'
                    >
                        {searchResult?.map((contact, i: number) => {
                            if (favorites?.find(fav => fav.id === contact.id))
                                return (
                                    <CardContact
                                        key={i}
                                        data={contact}
                                        isFavorite
                                    />
                                )

                            return (
                                <CardContact
                                    key={i}
                                    data={contact}
                                />
                            )
                        })}
                    </Stack>
                )}
            </AnimateScreenBody>
        </AnimateScreen>
    )
}

export default SearchContact
