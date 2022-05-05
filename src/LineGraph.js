import React, { useEffect, useState } from 'react'
import {Line} from "react-chartjs-2"

function LineGraph() {
    const [data, setData ] = useState({})

    const buildChartData = (data , casesType='cases') => {
        const chartData = []
        let lastDataPoint
        data[casesType].forEach(date => {
            if( lastDataPoint){
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint)
            }
            lastDataPoint = data[casesType][date]
        })
        return chartData

    }

    useEffect( () => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                let chartData = buildChartData(data)
                console.log(chartData)
                setData(chartData)
            })
    } , [])


  return (
    <div>
        <h1>it is a graph</h1>
        
    </div>
  )
}

export default LineGraph