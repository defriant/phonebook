import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from '../pages/Contact'

describe('Contact Page', () => {
    test('Should render Contact page without error', () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>,
        )
        expect(true).toBeTruthy()
    })
})
