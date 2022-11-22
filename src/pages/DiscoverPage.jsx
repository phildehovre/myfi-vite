import React, { useEffect, useState } from 'react'
import Section from '../components/Section'
import Chart from '../components/Chart'
import { useTimeSeries } from '../utils/db'
import SearchBar from '../components/SearchBar'

function DiscoverPage() {

    const [selectedTicker, setSelectedTicker] = useState(null)
    const [sampleSize, setSampleSize] = useState(20)
    const [sample, setSample] = useState(null)
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        setSample(data?.data.values.slice(0, sampleSize).reverse())
    }, [sampleSize])

    const onSuccess = (data) => {
        setSample(data.data.values.slice(0, sampleSize).reverse())
    }

    useEffect(() => {
        if (sample && sample !== null) {
            const backgroundColor = sample[0].close > sample[sample.length - 1].close ? 'rgba(255, 99, 132, 0.5)' : "rgba(75,192,192,0.2)"
            const labels = sample?.map((i) => { return i.datetime })
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Adj. Close',
                    data: sample.map(i => i.close),
                    backgroundColor: backgroundColor,
                    fill: true
                }]
            }
            setChartData(data)
        }
    }, [sample])


    const onError = (err) => {
        console.log(err)
    }
    const { isLoading, data, errors } = useTimeSeries(selectedTicker, onSuccess, onError)

    const handleTickerChange = (t) => {
        setSelectedTicker(t)
    }

    const handleSampleSizeChange = (val) => {
        if (val > 0 && sampleSize <= 5000) {
            setSampleSize(prev => prev + 5)
        } else if (val < 0 && sampleSize > 5) {
            setSampleSize(prev => prev - 5)
        }
    }

    const renderChart = () => {
        if (isLoading) {
            return (
                <div>Loading...</div>
            )
        }

        if (!isLoading && chartData && !errors) {
            return (
                <Chart data={chartData} handleSampleSizeChange={handleSampleSizeChange} />
            )
        }

        return (
            <div>{errors}</div>
        )
    }

    return (
        <Section>
            <SearchBar handleTickerChange={handleTickerChange} />
            {renderChart()}
            {
                data?.data.code === 400 &&
                <div>{data.data.message}</div>
            }
        </Section>
    )
}

export default DiscoverPage