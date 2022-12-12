import React, { useContext } from 'react'
import Spinner from './Spinner'
import Watchlist from './watchlist'
// import { useWatchlistByOwner } from '../utils/db'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'

function WatchlistWrapper({ user }) {

    const {
        isWatchlistLoading,
        watchlistData,
        watchlistError,
    } = useContext(selectedTickerContext)



    return (
        <>
            {
                isWatchlistLoading && !watchlistData
                    ? <Spinner />
                    : <Watchlist user={user} />
            }

        </>
    )
}

export default WatchlistWrapper