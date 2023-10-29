import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AddContact from '../pages/AddContact'
import { MockedProvider } from '@apollo/client/testing'

describe('Add Contact Page', () => {
    test('Should render Add Contact page without error', () => {
        render(
            <MemoryRouter>
                <MockedProvider>
                    <AddContact />
                </MockedProvider>
            </MemoryRouter>,
        )
        expect(true).toBeTruthy()
    })
})
