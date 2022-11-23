import React, { useState, useEffect } from 'react'
import './TickerItem.scss'

function TickerItem(props) {

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
                <span>{ticker.instrument_name}</span>
            }
        </div>
    )
}

export default TickerItem