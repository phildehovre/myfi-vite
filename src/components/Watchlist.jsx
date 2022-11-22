import React from 'react'
import { auth } from '../config/firebase'
import { useWatchlistByOwner } from '../utils/db'
import TickerItem from './TickerItem'

function Watchlist({ handleTickerItemClick }) {

    const { isLoading, data, error } = useWatchlistByOwner(auth.currentUser.uid)



    const renderWatchlist = () => {
        if (isLoading) {
            return (
                <div>Loading...</div>
            )

        }
        if (error) {
            alert(error.message)
        }

        if (data !== null && data.watchlist.length > 0) {
            return data.watchlist.map((ticker, i) => {
                return (
                    <TickerItem
                        ticker={ticker}
                        key={i}
                        handleTickerItemClick={handleTickerItemClick}
                    />
                )
            })
        }
    }


    return (
        <div className='watchlist-ctn'>{renderWatchlist()}</div>
    )
}

export default Watchlist