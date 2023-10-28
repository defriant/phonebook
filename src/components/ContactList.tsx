import { Fragment, useContext, useEffect, useState } from 'react'
import { ContactContext, TContact } from '../pages/Contact'
import { Stack, Text } from '@chakra-ui/react'
import CardContact from './CardContact'

function ContactList() {
    const { data } = useContext(ContactContext)
    const [formattedContacts, setFormattedContacts] = useState([])

    useEffect(() => {
        if (data) {
            const sortedContact: any = []

            data.contact.forEach((contact: TContact) => {
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
    }, [data])

    return (
        <>
            {formattedContacts.map((c: any, i: number) => (
                <Fragment key={i}>
                    <Text
                        fontSize='sm'
                        fontWeight='semibold'
                    >
                        {c.key.toUpperCase()}
                    </Text>
                    <Stack spacing='.75rem'>
                        {c.contacts.map((v: TContact, j: number) => (
                            <CardContact
                                key={j}
                                data={v}
                            />
                        ))}
                    </Stack>
                </Fragment>
            ))}
        </>
    )
}

export default ContactList
