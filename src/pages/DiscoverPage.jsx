import React, { useEffect, useState } from 'react'
import Section from '../components/Section'
import Chart from '../components/Chart'
import { useTimeSeries } from '../utils/db'
import SearchBar from '../components/SearchBar'
import ChartWrapper from '../components/ChartWrapper'

function DiscoverPage() {


    const [selectedTicker, setSelectedTicker] = useState()

    const handleTickerChange = (t) => {
        setSelectedTicker(t)
    }

    return (
        <Section>
            <SearchBar handleTickerChange={handleTickerChange} />
            <ChartWrapper selectedTicker={selectedTicker} />
        </Section>
    )
}

export default DiscoverPage