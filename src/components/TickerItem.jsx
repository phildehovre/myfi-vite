import React, { useState, useEffect } from 'react';
import { deleteItem } from '../utils/db'
import { getAuth } from 'firebase/auth';

import './TickerItem.scss'

function TickerItem(props) {

    const auth = getAuth()

    const [itemForDeletion, setItemForDeletion] = useState()

    const onDelete = (t) => {
        deleteItem(t, auth.currentUser.uid)
        console.log(t)
    }

    useState(() => {
    }, [itemForDeletion])

    const { ticker, handleTickerItemClick, id } = props
    const [isHovered, setIsHovered] = useState(false)


    return (
        <div className='ticker_item-ctn'
            onClick={() => handleTickerItemClick(ticker)}
            onMouseEnter={() => { setIsHovered(id) }}
            onMouseLeave={() => { setIsHovered('') }}
        >
            <span>
                {ticker.symbol}
            </span>
            {isHovered === id &&
                <>
                    <span>{ticker.instrument_name}</span>
                    <span onClick={() => { onDelete(ticker) }}>x</span>
                </>
            }
        </div>
    )
}

export default TickerItem