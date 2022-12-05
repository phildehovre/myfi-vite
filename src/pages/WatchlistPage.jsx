import React, { useEffect, useState } from 'react'
import Watchlist from '../components/watchlist'
// import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import ChartWrapper from '../components/ChartWrapper'
import Section from '../components/Section'
import PageContainer from '../components/PageContainer'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import Spinner from '../components/Spinner'
import TickerQuote from '../components/TickerQuote'
import NewsCarousel from '../components/NewsCarousel'

function WatchlistPage() {

    const auth = getAuth()

    const [selectedTicker, setSelectedTicker] = useState();
    const [user, loading, error] = useAuthState(auth)

    const handleTickerItemClick = (ticker) => {
        setSelectedTicker(ticker)
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            navigate('/watchlist')
        }
    }, []);

    return (
        <>
            <NewsCarousel />
            <PageContainer className='watchlist_page-ctn'>
                {loading
                    ? <Spinner size='3x' />
                    : <Watchlist handleTickerItemClick={handleTickerItemClick} user={user} />
                }

                <TickerQuote ticker={selectedTicker} />
                <ChartWrapper selectedTicker={selectedTicker} handleTickerItemClick={handleTickerItemClick} />
            </PageContainer>
        </>
    )
};

export default WatchlistPage