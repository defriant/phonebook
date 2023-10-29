import { useContext, useEffect, useState } from 'react'
import { Stack, Text } from '@chakra-ui/react'
import CardContact from './CardContact'
import { ContactContext, TContact } from '../contexts/ContactProvider'
import { FavoritesContext } from '../contexts/FavoriteContactProvider'

function ContactList() {
    const { data } = useContext(ContactContext)
    const { favorites, updateFavorite } = useContext(FavoritesContext)
    const [formattedContacts, setFormattedContacts] = useState<any>([])

    useEffect(() => {
        if (data) {
            const sortedContact: any = []

            // restructure received contacts
            data.contact.forEach(contact => {
                if (favorites?.find(fav => fav.id === contact.id)) return

                if (sortedContact.length === 0) {
                    sortedContact.push({
                        key: contact.first_name.toLowerCase()[0],
                        contacts: [contact],
                    })
                } else {
                    const keyExist = sortedContact.findIndex((c: any) => c.key === contact.first_name.toLowerCase()[0])
                    if (keyExist >= 0) {
                        sortedContact[keyExist].contacts.push(contact)
                    } else {
                        sortedContact.push({
                            key: contact.first_name.toLowerCase()[0],
                            contacts: [contact],
                        })
                    }
                }
            })

            setFormattedContacts(sortedContact)
        }
    }, [data, favorites])

    // Update existing favorite data
    useEffect(() => {
        if (data) {
            data.contact.forEach(contact => {
                if (favorites?.find(fav => fav.id === contact.id)) {
                    updateFavorite!(contact.id, {
                        id: contact.id,
                        first_name: contact.first_name,
                        last_name: contact.last_name,
                        phones: contact.phones.map(phone => ({ number: phone.number })),
                    })
                }
            })
        }
    }, [data])

    return (
        <>
            {favorites && favorites?.length > 0 && (
                <Stack spacing='1rem'>
                    <Text
                        fontSize='sm'
                        fontWeight='semibold'
                        pos='sticky'
                    >
                        Favorite
                    </Text>
                    <Stack spacing='.75rem'>
                        {favorites?.map((fav, i: number) => (
                            <CardContact
                                key={i}
                                data={fav}
                                isFavorite
                            />
                        ))}
                    </Stack>
                </Stack>
            )}

            <Stack spacing='1.5rem'>
                <Text
                    fontSize='sm'
                    fontWeight='semibold'
                >
                    All Contact
                </Text>
                {formattedContacts.map((c: any, i: number) => (
                    <Stack
                        key={i}
                        spacing='.75rem'
                    >
                        <Text
                            fontSize='sm'
                            fontWeight='semibold'
                        >
                            {c.key.toUpperCase()}
                        </Text>
                        <Stack spacing='.75rem'>
                            {c.contacts.map((v: TContact, j: number) => {
                                if (!favorites?.find(fav => fav.id === v.id))
                                    return (
                                        <CardContact
                                            key={j}
                                            data={v}
                                        />
                                    )
                            })}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
        </>
    )
}

export default ContactList
