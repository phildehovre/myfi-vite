import React, { useEffect, useState } from 'react'
import Watchlist from '../components/watchlist'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { useTimeSeries } from '../utils/db'
import Chart from '../components/Chart'

function WatchlistPage() {

    const [showGraph, setShowGraph] = useState(false)
    const [ticker, setTicker] = useState(null)


    const onSuccess = (data) => { console.log(data) }
    const onError = () => { }
    const { isLoading, data, error } = useTimeSeries(ticker, onSuccess, onError)

    const handleTickerItemClick = (ticker) => {
        setTicker(ticker)
        setShowGraph(true)
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login')
        }
    }, [])

    return (<>
        <Watchlist handleTickerItemClick={handleTickerItemClick} />
        {isLoading && <div>Loading...</div>}
        {!isLoading && showGraph
            &&
            <Chart />
        }
    </>
    )
}

export default WatchlistPage