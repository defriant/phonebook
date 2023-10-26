import { lazy } from 'react'
import { Route, Routes as ReactRoutes } from 'react-router-dom'
import { PATH } from './path'

const Contact = lazy(() => import('../pages/Contact'))

function Routes() {
    return (
        <ReactRoutes>
            <Route
                path={PATH.contact}
                element={<Contact />}
            />
        </ReactRoutes>
    )
}

export default Routes
