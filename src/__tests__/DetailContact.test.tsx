import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import DetailContact from '../pages/DetailContact'
import { GetContactDetail } from '../gql/queries'
import { PATH } from '../routes/path'

describe('Detail Contact Page', () => {
    test('Should render Detail Contact page without error', () => {
        const contact_id = 30646

        render(
            <MemoryRouter initialEntries={[`/${contact_id}`]}>
                <Routes>
                    <Route
                        path={PATH.detailContact}
                        element={
                            <MockedProvider
                                mocks={[
                                    {
                                        request: {
                                            query: GetContactDetail,
                                            variables: {
                                                id: contact_id,
                                            },
                                        },
                                    },
                                ]}
                                addTypename={false}
                            >
                                <DetailContact />
                            </MockedProvider>
                        }
                    />
                </Routes>
            </MemoryRouter>,
        )
        expect(true).toBeTruthy()
    })
})
