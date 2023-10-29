import { Suspense, lazy } from 'react'
import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom'
import { PATH } from './path'
import { AnimatePresence } from 'framer-motion'
import PageLoader from '../components/PageLoader'

const Contact = lazy(() => import('../pages/Contact'))
const SearchContact = lazy(() => import('../pages/SearchContact'))
const AddContact = lazy(() => import('../pages/AddContact'))
const DetailContact = lazy(() => import('../pages/DetailContact'))

function Routes() {
    const location = useLocation()

    return (
        <Suspense fallback={<PageLoader />}>
            <AnimatePresence>
                <ReactRoutes
                    location={location}
                    key={location.pathname}
                >
                    <Route
                        path={PATH.contact}
                        element={<Contact />}
                    >
                        <Route
                            path={PATH.searchContact}
                            element={<SearchContact />}
                        />
                        <Route
                            path={PATH.addContact}
                            element={<AddContact />}
                        />
                        <Route
                            path={PATH.detailContact}
                            element={<DetailContact />}
                        />
                    </Route>
                </ReactRoutes>
            </AnimatePresence>
        </Suspense>
    )
}

export default Routes
