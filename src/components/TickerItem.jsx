import React from 'react'

function TickerItem(props) {

    const { ticker, handleTickerItemClick } = props

    return (
        <div onClick={() => handleTickerItemClick(ticker)}>{ticker.instrument_name}</div>
    )
}

export default TickerItem