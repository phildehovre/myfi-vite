import React, { useContext, useEffect, useState } from 'react'
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
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'
import WatchlistWrapper from '../components/WatchlistWrapper'
import Modal from '../components/Modal'

function WatchlistPage() {

    const auth = getAuth()
    const [user, loading, error] = useAuthState(auth)
    const [countDown, setCountdown] = useState(60)


    const {
        selectedTicker,
        handleTickerSelection,
        isTickerLoading,
        isTickerErrors,
        watchlistError,
        watchlistData,
        showModal
    } = useContext(selectedTickerContext)

    const handleTickerItemClick = (ticker) => {
        setSelectedTicker(ticker)
    };

    // useEffect(() => {
    //     if (showModal) {
    //         if (countDown !== 0) {
    //             setInterval(() => {
    //                 setCountdown(prev => { prev - 1 })
    //             }, 1000)
    //         }
    //     }
    // }, [showModal])

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            navigate('/watchlist')
        }
    }, []);

    const renderWatchlistPage = () => {
        if (!loading && isTickerLoading) {
            return <Spinner size='3x' />
        }

        if (user && watchlistData) {
            return (
                <>
                    <WatchlistWrapper handleTickerItemClick={handleTickerSelection} user={user} />
                    <TickerQuote ticker={selectedTicker} />
                    <ChartWrapper selectedTicker={selectedTicker} handleTickerItemClick={handleTickerItemClick} />
                </>
            )
        }

    }

    return (
        <>
            <NewsCarousel />
            <PageContainer className='watchlist_page-ctn'>
                {renderWatchlistPage()}
            </PageContainer>
            {/* {
                showModal &&
                <Modal>
                    <h2>Don't get greedy!</h2>
                    <p>This web app is powered by the API graciously provided by the people at https://twelvedata.com/.
                        The free plan is what allowed me to develop this page and test it, it is unfortunately limited to 5 or 6 calls per minute.
                        I apologise for the inconvenience, please do stick around until the end of the countdown to resume your observation!
                    </p>
                    <h3>
                        {countDown}
                    </h3>
                </Modal>
            } */}
            {
                watchlistError &&
                <div className='error'>{error.message}</div>
            }
        </>
    )
};

export default WatchlistPage