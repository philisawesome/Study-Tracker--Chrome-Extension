import { useState, useEffect } from "react";

function Graph() {
  type Session = {
    dayKey: string;
    duration: number;
    sessStart: string;
  };
  type DayDate = {
    totalDuration: number;
  };
  const [logData, setLogData] = useState<Session[]>([]);

  useEffect(() => {
    async function loadData() {
      const result = await chrome.storage.local.get("sessions");
      setLogData((result.sessions ?? []) as any[]);
    }

    loadData();
  }, []);

  function days() {
    const copyLogData = [...logData];
    copyLogData.sort((a, b) => b.dayKey.localeCompare(a.dayKey));
    let logGroups: Record<string, DayDate> = {};
    const data: Record<string, DayDate> = {};
    const dayArray = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const curDay = `${year}-${month}-${day}`;
      dayArray.push(curDay);
    }
    for (let i = 0; i < copyLogData.length; i++) {
      let newKey = copyLogData[i].dayKey;
      if (!(newKey in logGroups)) {
        logGroups[newKey] = { totalDuration: 0 };
      }
      logGroups[newKey].totalDuration += Number(logData[i].duration);
    }
    for (let i = 0; i < dayArray.length; i++) {
      if (dayArray[i] in logGroups) {
        data[dayArray[i]] = {
          totalDuration: logGroups[dayArray[i]].totalDuration,
        };
      } else {
        data[dayArray[i]] = { totalDuration: 0 };
      }
    }
    const finalData = Object.entries(data).map(([key, value]) => {
      return {
        dayKey: key,
        totalDuation: value.totalDuration,
      };
    });
    finalData.sort((a, b) => a.dayKey.localeCompare(b.dayKey));

    return finalData;
  }

  function graph() {
    const data = days();
    let xValues = [];
    let yValues = [];
    for (let i = 0; i < data.length; i++) {
      xValues.push(data[i].dayKey);
    }
    for (let i = 0; i < data.length; i++) {
      yValues.push(data[i].totalDuation);
    }
    const yMax = Math.max(...yValues);
    const yMin = 0;
    let coords = [];
    for (let i = 0; i < data.length; i++) {}
  }
}

export default Graph;
