import { Fragment, useContext, useEffect, useState } from 'react'
import { ContactContext } from '../pages/Contact'
import { Stack, Text } from '@chakra-ui/react'
import CardContact from './CardContact'

function ContactList() {
    const { data } = useContext(ContactContext)
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        if (data) {
            const sortedContact: any = []

            data.contact.forEach((v: any) => {
                if (sortedContact.length === 0) {
                    sortedContact.push({
                        key: v.first_name.toLowerCase()[0],
                        contacts: [v],
                    })
                } else {
                    const keyExist = sortedContact.findIndex((c: any) => c.key === v.first_name.toLowerCase()[0])
                    if (keyExist >= 0) {
                        sortedContact[keyExist].contacts.push(v)
                    } else {
                        sortedContact.push({
                            key: v.first_name.toLowerCase()[0],
                            contacts: [v],
                        })
                    }
                }
            })

            setContacts(sortedContact)
        }
    }, [data])

    return (
        <>
            {contacts.map((c: any, i: number) => (
                <Fragment key={i}>
                    <Text
                        fontSize='sm'
                        fontWeight='semibold'
                    >
                        {c.key.toUpperCase()}
                    </Text>
                    <Stack spacing='.75rem'>
                        {c.contacts.map((v: any, j: number) => (
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
