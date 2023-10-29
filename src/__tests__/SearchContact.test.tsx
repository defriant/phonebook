import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchContact from '../pages/SearchContact'

describe('Search Contact Page', () => {
    test('Should render Search Contact page without error', () => {
        render(
            <MemoryRouter>
                <SearchContact />
            </MemoryRouter>,
        )
        expect(true).toBeTruthy()
    })
})
