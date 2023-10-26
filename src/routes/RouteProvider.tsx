import { useLayoutEffect, useState, startTransition } from 'react'
import { Update, createBrowserHistory } from 'history'
import { Router as ReactRouter } from 'react-router-dom'
import Routes from './Routes'

const history = createBrowserHistory()

type RouteProviderProps = {
    basename?: string
}

function RouteProvider({ basename }: RouteProviderProps) {
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
            <Routes />
        </ReactRouter>
    )
}

export default RouteProvider
