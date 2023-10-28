import { ReactNode, createContext, useState } from 'react'

export type TFavorite = {
    id: number
    first_name: string
    last_name: string
    phones: {
        number: string
    }[]
}

type TFavoritesContext = {
    favorites?: TFavorite[]
    setFavorite?: (data: TFavorite) => void
    removeFavorite?: (id: number) => void
    updateFavorite?: (id: number, data: TFavorite) => void
}

export const FavoritesContext = createContext<TFavoritesContext>({})

function FavoriteContactProvider({ children }: { children?: ReactNode }) {
    const [favorites, setFavorites] = useState(() => {
        const saved: string | null = localStorage.getItem('favorites')
        if (saved) {
            const parseSaved = JSON.parse(saved)
            return parseSaved
        }

        return []
    })

    const setFavorite = (data: TFavorite) => {
        const saved = localStorage.getItem('favorites')
        if (saved) {
            const parseSaved: TFavorite[] = JSON.parse(saved)
            if (parseSaved.findIndex((v: TFavorite) => v.id === data.id) >= 0) return

            parseSaved.push(data)
            setFavorites(parseSaved)
            return localStorage.setItem('favorites', JSON.stringify(parseSaved))
        }

        setFavorites([data])
        return localStorage.setItem('favorites', JSON.stringify([data]))
    }

    const updateFavorite = (id: number, data: TFavorite) => {
        const saved = localStorage.getItem('favorites')
        if (saved) {
            const parseSaved: TFavorite[] = JSON.parse(saved)
            const newFavorites: TFavorite[] = [...parseSaved]
            const index = newFavorites.findIndex(fav => fav.id === id)

            if (index >= 0) {
                newFavorites[index] = data
                setFavorites(newFavorites)
                localStorage.setItem('favorites', JSON.stringify(newFavorites))
            }
        }
    }

    const removeFavorite = (id: number) => {
        const saved = localStorage.getItem('favorites')
        if (saved) {
            const parseSaved: TFavorite[] = JSON.parse(saved)
            const newFavorites: TFavorite[] = parseSaved.filter(fav => fav.id !== id)
            setFavorites(newFavorites)
            localStorage.setItem('favorites', JSON.stringify(newFavorites))
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites: favorites, setFavorite, updateFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoriteContactProvider
