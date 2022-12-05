import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useQuote, useWatchlistByOwner } from '../utils/db'
import Spinner from './Spinner'
import './TickerQuote.scss'
import './InputRange.scss'

function TickerQuote({ ticker }) {

    const [interval, setInterval] = useState('1day')
    const onSuccess = (data) => {
        console.log(data.data)
    }
    const { isLoading, data, error } = useQuote(ticker, interval, onSuccess)


    const renderRange = () => {
        if (!isLoading && !error && data) {
            const { high, low } = data.data.fifty_two_week
            return (
                <div className='price_range-ctn'>
                    <h4>52-week range:</h4>
                    <span>
                        <span className='range-ctn'>
                            {low}
                            <input readOnly type='range' min={low} max={high} value={data.data.close} />
                            <span className='range-percentage'></span>
                            {high}
                        </span>
                    </span>
                </div>

            )
        }
    }



    return (
        <>
            {isLoading &&
                <Spinner />
            }

            {!isLoading && !error && data &&
                <div className='quote-ctn'>
                    <h1>{data.data.symbol}</h1>
                    <p>{data.data.name}</p>
                    <span>
                        <h4>Open:</h4>
                        <p>{data.data.open}</p>
                    </span>
                    <span>
                        <h4>Close:</h4>
                        <p>{data.data.close}</p>
                    </span>
                    <span>
                        <h4>Previous Close:</h4>
                        <p style={{ display: 'flex' }}>{data.data.previous_close}
                            <span style={{ color: `${data.data.percent_change >= 0 ? 'lightgreen' : 'salmon'}`, fontSize: '.8em' }}>
                                {data.data.percent_change}%
                            </span>
                        </p>
                    </span>
                    <span>
                        <h4>Average volume:</h4>
                        <p>{data.data.average_volume}</p>
                    </span>
                    <span>
                        <h4>Average volume:</h4>
                        <p>{data.data.average_volume}</p>
                    </span>
                    {renderRange()}
                </div>
            }
        </>
    )
}

export default TickerQuote