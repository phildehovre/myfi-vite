import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Filler, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, defaults } from 'chart.js';
import './Chart.scss'

ChartJS.register(LineController, Filler, LineElement, PointElement, LinearScale, CategoryScale, Title);

function Chart({ data, handleSampleSizeChange }) {

    const handleWheelOverChart = (e) => {
        e.stopPropagation()
        handleSampleSizeChange(e.deltaY)
    }

    return (
        <div className='chart-ctn'>
            <Line
                data={data}
                options={{}}
                onWheel={e => { handleWheelOverChart(e) }}
            />
        </div>
    )
}

export default Chart