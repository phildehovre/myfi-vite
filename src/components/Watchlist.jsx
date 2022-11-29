import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { useWatchlistByOwner } from '../utils/db'
import SearchBar from './SearchBar'
import Spinner from './Spinner'
import TickerItem from './TickerItem'
import './Watchlist.scss'

function Watchlist({ handleTickerItemClick, user }) {


    const { isLoading, data, error } = useWatchlistByOwner(user.uid)

    const renderWatchlist = () => {
        if (isLoading) {
            return (
                <Spinner />
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
                        id={i}
                    />
                )
            })
        }
    }


    return (<>
        <div>
            <div className='watchlist-ctn'>{renderWatchlist()}</div>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </div>

    </>
    )
}

export default Watchlist