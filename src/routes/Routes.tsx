import { lazy } from 'react'
import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom'
import { PATH } from './path'
import { AnimatePresence } from 'framer-motion'

const Contact = lazy(() => import('../pages/Contact'))
const AddContact = lazy(() => import('../pages/AddContact'))
const DetailContact = lazy(() => import('../pages/DetailContact'))

function Routes() {
    const location = useLocation()

    return (
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
    )
}

export default Routes
