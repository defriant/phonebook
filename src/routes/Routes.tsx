import { lazy } from 'react'
import { Route, Routes as ReactRoutes, useLocation } from 'react-router-dom'
import { PATH } from './path'
import { AnimatePresence } from 'framer-motion'
const Contact = lazy(() => import('../pages/Contact'))
const AddContact = lazy(() => import('../pages/AddContact'))

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
                </Route>
            </ReactRoutes>
        </AnimatePresence>
    )
}

export default Routes
