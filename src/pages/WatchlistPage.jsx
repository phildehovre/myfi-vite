import React, { useEffect, useState } from 'react'
import Watchlist from '../components/watchlist'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import ChartWrapper from '../components/ChartWrapper'
import Section from '../components/Section'
import PageContainer from '../components/PageContainer'

function WatchlistPage() {

    const [selectedTicker, setSelectedTicker] = useState(null)

    const handleTickerItemClick = (ticker) => {
        setSelectedTicker(ticker)
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/login')
        }
    }, [])

    return (
        <PageContainer className='watchlist_page-ctn'>
            <Watchlist handleTickerItemClick={handleTickerItemClick} />
            <ChartWrapper selectedTicker={selectedTicker} />
        </PageContainer>
    )
}

export default WatchlistPage