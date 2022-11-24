import React, { useEffect, useState } from 'react'
import Watchlist from '../components/watchlist'
// import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import ChartWrapper from '../components/ChartWrapper'
import Section from '../components/Section'
import PageContainer from '../components/PageContainer'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../components/Spinner'

function WatchlistPage() {

    const auth = getAuth()

    const [selectedTicker, setSelectedTicker] = useState();
    const [user, loading, error] = useAuthState(auth)

    const handleTickerItemClick = (ticker) => {
        setSelectedTicker(ticker)
    };

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         navigate('/login')
    //     }
    // }, []);

    return (
        <PageContainer className='watchlist_page-ctn'>
            {loading
                ? <Spinner size='3x' />
                : <Watchlist handleTickerItemClick={handleTickerItemClick} user={user} />
            }
            <ChartWrapper selectedTicker={selectedTicker} handleTickerItemClick={handleTickerItemClick} />
        </PageContainer>
    )
};

export default WatchlistPage