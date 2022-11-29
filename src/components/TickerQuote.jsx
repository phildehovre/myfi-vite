import React, { useEffect, useState } from 'react'
import { useQuote } from '../utils/db'
import Spinner from './Spinner'
import './TickerQuote.scss'

function TickerQuote({ ticker }) {

    const [interval, setInterval] = useState('1day')

    const onSuccess = (data) => {
    }


    const renderQuote = () => {
        if (!isLoading && !error && data) {
            const keys = Object.keys(data.data)
            return keys.map((key, i) => {
                if (key !== 'fifty_two_week') {
                    return (
                        <li>{key}: {data.data[key]}</li>
                    )
                }
            });
        };
    };

    const { isLoading, data, error } = useQuote(ticker, interval, onSuccess)


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
                    {/* <input type='range' />
                    <input type='range' /> */}
                </div>
            }
        </>
    )
}

export default TickerQuote