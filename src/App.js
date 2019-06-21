import React from "react";
import {
  getDefaultStartAndEndDate,
  getDateRangeData,
  getDateDataMapping,
  DateFormatMask
} from "./helpers";
import * as data from "./data.json";
import dateFormat from "dateformat";

function App() {
  const { items } = data;

  const displayDateRange = () => {
    const dateRange = getDefaultStartAndEndDate("2019-03-01");
    const dateRangeData = getDateRangeData(
      dateRange.startDate,
      dateRange.endDate,
      items
    );

    return `Startdate: ${dateRange.startDate}, Enddate: ${dateRange.endDate}`;
  };

  const displayData = () => {
    const itemsMapping = getDateDataMapping(items);
    return (
      <>
        <ul>
          {items.map((d, i) => (
            <li key={i}>
              {`[${dateFormat(d.workspaceSettlementDate, DateFormatMask)}]`}:{" "}
              {d.count}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <div className="App">Dashboard calendar</div>
      {displayDateRange()}
      {displayData()}
    </>
  );
}

export default App;
