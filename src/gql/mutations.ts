import { gql } from '@apollo/client'

export const AddContactWithPhones = gql`
    mutation AddContactWithPhones($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {
        insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {
            returning {
                first_name
                last_name
                id
                phones {
                    number
                }
            }
        }
    }
`

export const EditContactById = gql`
    mutation EditContactById($id: Int!, $_set: contact_set_input) {
        update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
            id
            first_name
            last_name
            phones {
                number
            }
        }
    }
`

export const DeleteContactById = gql`
    mutation MyMutation($id: Int!) {
        delete_contact_by_pk(id: $id) {
            first_name
            last_name
            id
        }
    }
`

export const AddNumberToContact = gql`
    mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
        insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
            returning {
                contact {
                    id
                    last_name
                    first_name
                    phones {
                        number
                    }
                }
            }
        }
    }
`
