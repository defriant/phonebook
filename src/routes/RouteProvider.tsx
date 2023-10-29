import { useLayoutEffect, useState, startTransition, ReactNode } from 'react'
import { Update, createBrowserHistory } from 'history'
import { Router as ReactRouter } from 'react-router-dom'

const history = createBrowserHistory()

type RouteProviderProps = {
    basename?: string
    children: ReactNode
}

function RouteProvider({ basename, children }: RouteProviderProps) {
    const [routeState, setRouteState] = useState({
        action: history.action,
        location: history.location,
    })

    useLayoutEffect(() => {
        history.listen((update: Update) => {
            startTransition(() => {
                setRouteState(update)
            })
        })
    }, [history])

    return (
        <ReactRouter
            basename={basename}
            location={routeState.location}
            navigationType={routeState.action}
            navigator={history}
        >
            {children}
        </ReactRouter>
    )
}

export default RouteProvider
