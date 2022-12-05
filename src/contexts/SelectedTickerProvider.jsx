import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useTimeSeries, useWatchlistByOwner, useQuote } from '../utils/db'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useQueryClient } from 'react-query'
import { FALSE } from 'sass'

export const selectedTickerContext = new React.createContext()

function SelectedTickerProvider({ children }) {

    const [selectedTicker, setSelectedTicker] = useState()
    const [interval, setInterval] = useState('5min')
    const [showModal, setShowModal] = useState(false)


    const auth = getAuth()
    const [user, loading, userError] = useAuthState(auth)

    // Async data fetching

    const onSuccess = (data) => {
        if (data.data.code === 429) {
            setShowModal(true)
        }
    }

    const {
        data: tickerData,
        isLoading: isTickerLoading,
        error: tickerError
    } = useTimeSeries(selectedTicker, interval, onSuccess)

    const {
        data: watchlistData,
        isLoading: isWatchlistLoading,
        error: watchlistError
    } = useWatchlistByOwner(user?.uid, onSuccess)

    const {
        data: quoteData,
        isLoading: isQuoteLoading,
        error: quoteError
    } = useQuote(selectedTicker, interval, onSuccess)


    // Display tick on top of watchlist on mount
    useEffect(() => {

        if (!isWatchlistLoading && user && !selectedTicker) {
            setSelectedTicker(watchlistData?.watchlist[0])
        }
    })


    const handleTickerSelection = (t) => {
        setSelectedTicker(t)
    }

    const value = {
        isWatchlistLoading,
        watchlistData,
        watchlistError,
        interval,
        setInterval,
        handleTickerSelection,
        selectedTicker,
        tickerData,
        isTickerLoading,
        isQuoteLoading,
        quoteData,
        quoteError,
        showModal, setShowModal
    }

    return (
        <selectedTickerContext.Provider value={value}>
            {children}
        </selectedTickerContext.Provider>
    )
}

export default SelectedTickerProvider