import React, { useEffect, useState } from 'react'
import Chart from './Chart'
import { useTimeSeries } from '../utils/db'
import './Chart.scss'

function ChartWrapper({ selectedTicker }) {

    const [sampleSize, setSampleSize] = useState(20)
    const [sample, setSample] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [interval, setInterval] = useState('1day')

    useEffect(() => {
        setSample(data?.data.values.slice(0, sampleSize).reverse())
    }, [sampleSize]);

    const handleTimeFrameChange = (interval, sampleSize) => {
        setInterval(interval);
        setSampleSize(sampleSize)
    };

    const onSuccess = (data) => {
        setSample(data.data.values.slice(0, sampleSize).reverse())
    };
    const onError = (error) => {
        alert(error.message)
    };


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
            };
            setChartData(data);
        };
    }, [sample]);


    const { isLoading, data, errors } = useTimeSeries(selectedTicker, interval, onSuccess, onError);

    const handleSampleSizeChange = (val) => {
        if (val > 0 && sampleSize <= 5000) {
            setSampleSize(prev => prev + 5)
        } else if (val < 0 && sampleSize > 5) {
            setSampleSize(prev => prev - 5)
        };
    };

    const renderChart = () => {
        if (isLoading) {
            return (
                <div>Loading...</div>
            )
        };

        if (!isLoading && chartData && !errors) {
            return (
                <Chart data={chartData} handleSampleSizeChange={handleSampleSizeChange} />
            )
        };

        return (
            <div>{errors}</div>
        )
    };

    return (
        <div className='chart_wrapper'>
            {renderChart()}
            <div>
                <button onClick={() => handleTimeFrameChange('1min', 177)}>1d</button>
                <button onClick={() => handleTimeFrameChange('30min', 100)}>1w</button>
                <button onClick={() => handleTimeFrameChange('2h', 87)}>1m</button>
                <button onClick={() => handleTimeFrameChange('1day', 130)}>6m</button>
                <button onClick={() => handleTimeFrameChange('1day', 255)}>1y</button>
                <button onClick={() => handleTimeFrameChange('1week', 260)}>3y</button>

            </div>

        </div>
    )
};

export default ChartWrapper;