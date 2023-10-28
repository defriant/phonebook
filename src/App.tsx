import ContactProvider from './contexts/ContactProvider'
import FavoriteContactProvider from './contexts/FavoriteContactProvider'
import RouteProvider from './routes/RouteProvider'

function App() {
    return (
        <ContactProvider>
            <FavoriteContactProvider>
                <RouteProvider />
            </FavoriteContactProvider>
        </ContactProvider>
    )
}

export default App
