import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Graph() {
  type Session = {
    dayKey: string;
    duration: number;
  };
  type DayDate = {
    totalDuration: number;
  };
  const [logData, setLogData] = useState<Session[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  useEffect(() => {
    async function loadData() {
      const result = await chrome.storage.local.get("sessions");
      setLogData((result.sessions ?? []) as any[]);
    }

    loadData();
  }, []);
  useEffect(() => {
    const data = days();
    console.log("this is in the useEffecct " + JSON.stringify(data, null, 2));

    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Use Pixelify Sans everywhere
    Chart.defaults.font.family = "'Pixelify Sans', sans-serif";
    Chart.defaults.font.size = 14;
    Chart.defaults.color = "#111827";

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "line",

      data: {
        labels: data.map((row) => row.dayKey.slice(5)),

        datasets: [
          {
            label: "Study Time",
            data: data.map((row) => {
              let mins = row.totalDuration / (1000 * 60);
              if (mins - Math.floor(mins) > 0.5) {
                mins = Math.ceil(mins);
              } else {
                mins = Math.floor(mins);
              }
              return mins;
            }),

            fill: false,
            borderColor: "hsla(30, 100%, 16%, 0.95)",
            borderWidth: 5, // thicker line
            tension: 0.25,

            pointBackgroundColor: "#111827",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },

      options: {
        maintainAspectRatio: false,
        responsive: true,

        scales: {
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.55)",
            },
            ticks: {
              color: "#111827",
              font: {
                family: "'Pixelify Sans', sans-serif",
                size: 14,
                weight: "bold",
              },
            },
          },

          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.55)",
              lineWidth: 2,
            },
            ticks: {
              color: "#111827",
              font: {
                family: "'Pixelify Sans', sans-serif",
                size: 14,
                weight: "bold",
              },
            },
          },
        },

        plugins: {
          legend: {
            labels: {
              boxWidth: 0,
              padding: 15,
              color: "#111827",
              font: {
                family: "'Pixelify Sans', sans-serif",
                weight: "bold",
                size: 18,
              },
            },
          },

          tooltip: {
            titleFont: {
              family: "'Pixelify Sans', sans-serif",
              size: 14,
            },
            bodyFont: {
              family: "'Pixelify Sans', sans-serif",
              size: 14,
            },
            padding: 10,

            callbacks: {
              label: (context) => {
                const mins = context.parsed.y;

                if (mins == null) {
                  return "Mins This Day: 0m";
                }

                const hours = Math.floor(mins / 60);
                const remainingMins = mins % 60;

                if (hours === 0) {
                  return `Mins This Day: ${remainingMins}m`;
                }

                return `Mins This Day: ${hours}h ${remainingMins}m`;
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [logData]);
  function days() {
    const copyLogData = [...logData];
    copyLogData.sort((a, b) => b.dayKey.localeCompare(a.dayKey));
    let logGroups: Record<string, DayDate> = {};
    const data: Record<string, DayDate> = {};
    const dayArray: string[] = [];

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
      logGroups[newKey].totalDuration += Number(copyLogData[i].duration);
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
        totalDuration: value.totalDuration,
      };
    });
    finalData.sort((a, b) => a.dayKey.localeCompare(b.dayKey));

    return finalData;
  }
  function weeklyAvg() {
    const data = days();
    let total = 0;
    for (let i = 0; i < data.length; i++) {
      total += data[i].totalDuration;
    }

    const totalMins = (total / (1000 * 60)) % 60;
    const totalHrs = total / (1000 * 60 * 60);
    const avgMins = Math.round(totalMins / 7);
    const avgHrs = Math.round(totalHrs / 7);
    if (avgHrs === 0) {
      return `${avgMins}m`;
    } else {
      return `${avgHrs}h ${avgMins}m`;
    }
  }
  const avg = weeklyAvg();
  return (
    <div className="chart-container">
      {" "}
      <canvas className="chart" ref={chartRef}>
        {" "}
      </canvas>
      <div className="avg-container">
        <h2 className="avg-text"> {`Your average for this week is ${avg}`}</h2>
      </div>
    </div>
  );
}

export default Graph;
