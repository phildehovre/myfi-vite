import React from 'react'

export const selectedTickerContext = new React.createContext()

function SelectedTickerProvider({ children }) {

    const handleTickerSelection = (t) => {
        console.log(t)
    }

    const value = {
        something: 'hello',
        handleTickerSelection,
    }

    return (
        <selectedTickerContext.Provider value={value}>
            {children}
        </selectedTickerContext.Provider>
    )
}

export default SelectedTickerProvider