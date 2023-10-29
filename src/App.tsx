import ContactProvider from './contexts/ContactProvider'
import FavoriteContactProvider from './contexts/FavoriteContactProvider'
import Routes from './routes/Routes'

function App() {
    return (
        <ContactProvider>
            <FavoriteContactProvider>
                <Routes />
            </FavoriteContactProvider>
        </ContactProvider>
    )
}

export default App
