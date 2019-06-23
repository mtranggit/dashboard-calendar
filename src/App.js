import React from 'react'
import {
  getDefaultStartAndEndDate,
  getDateRangeData,
  getDateDataMapping,
  DateFormatMask,
} from './helpers'
import * as data from './data.json'
import dateFormat from 'dateformat'

import {MyChartHoc} from './components/my-chart-hoc/MyChartHoc'
import * as d3 from 'd3'

function App() {
  const {items} = data

  const displayDateRange = () => {
    const dateRange = getDefaultStartAndEndDate('2019-03-01')
    const dateRangeData = getDateRangeData(
      dateRange.startDate,
      dateRange.endDate,
      items,
    )

    return `Startdate: ${dateRange.startDate}, Enddate: ${dateRange.endDate}`
  }

  const displayData = () => {
    const itemsMapping = getDateDataMapping(items)
    return (
      <>
        <ul>
          {items.map((d, i) => (
            <li key={i}>
              {`[${dateFormat(d.workspaceSettlementDate, DateFormatMask)}]`}:{' '}
              {d.count}
            </li>
          ))}
        </ul>
      </>
    )
  }

  const MyChart = MyChartHoc(function() {
    const scale = d3
      .scaleLinear()
      .domain([0, 10])
      .range([0, 200])
    const axis = d3.axisBottom(scale)
    d3.select(this.myRef.current).call(axis)
  })

  return (
    <>
      <div className="App">Dashboard calendar</div>
      <h2>My Chart</h2>
      <MyChart x={20} y={40} />
      {/* {displayDateRange()} */}
      {/* {displayData()} */}
    </>
  )
}

export default App
