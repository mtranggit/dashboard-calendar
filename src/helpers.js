import {
  addDays,
  isSaturday,
  isSunday,
  isWeekend,
  getISOWeek,
  eachDayOfInterval
} from "date-fns";
import dateFormat from "dateformat";

export const DateFormatMask = "yyyy-mm-dd";

export const datesGroupByWeek = dates => {
  return dates.reduce((acc, cur) => {
    const key = getISOWeek(cur);
    (acc[key] = acc[key] || []).push(cur);
    return acc;
  }, {});
};

// Get the default start and end date
export const getDefaultStartAndEndDate = selectedDate => {
  let currentDate = dateFormat(new Date(), DateFormatMask); // today's date

  if (selectedDate) {
    currentDate = selectedDate;
  }

  let yesterday = addDays(currentDate, -1);
  let startDate;
  if (isWeekend(yesterday)) {
    if (isSunday(yesterday)) {
      startDate = addDays(yesterday, -2); // Friday
    } else if (isSaturday(yesterday)) {
      startDate = addDays(yesterday, -1); // Friday
    }
  } else {
    startDate = yesterday;
  }

  // endDate is 20 days from start date (total of 21 days = 3 weeks)
  const endDate = dateFormat(addDays(startDate, 20), DateFormatMask);
  startDate = dateFormat(startDate, DateFormatMask);
  return {
    startDate,
    endDate
  };
};

export const getDateDataMapping = data => {
  return data.reduce((acc, cur) => {
    const theDate = cur.workspaceSettlementDate;
    const count = cur.count;
    const dayOfWeek = dateFormat(theDate, "ddd");
    const year = dateFormat(theDate, "yy");
    const month = dateFormat(theDate, "m");
    const day = dateFormat(theDate, "d");
    const key = dateFormat(theDate, DateFormatMask);
    acc[key] = {
      count,
      dayOfWeek,
      year,
      month,
      day
    };
    return acc;
  }, {});
};

export const getDateRangeData = (from, to, data) => {
  const datesDataMap = getDateDataMapping(data);
  const datesRange = eachDayOfInterval({ start: from, end: to });
  const datesGroup = datesGroupByWeek(datesRange);

  const datesDataGroup = Object.values(datesGroup).map((dates, i) => {
    return dates
      .map(theDate => {
        if (!isWeekend(theDate)) {
          const key = dateFormat(theDate, DateFormatMask);
          if (datesDataMap[key]) {
            return {
              ...datesDataMap[key]
            };
          } else {
            return {
              count: 0,
              dayOfWeek: dateFormat(theDate, "ddd"),
              year: dateFormat(theDate, "yy"),
              month: dateFormat(theDate, "m"),
              day: dateFormat(theDate, "d")
            };
          }
        }
        return null;
      })
      .filter(Boolean);
  });
  console.log(datesDataGroup);
  return datesDataGroup;
};
