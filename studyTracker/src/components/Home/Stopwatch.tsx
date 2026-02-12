import { useState, useEffect } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  //const intervalIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    async function loadVal() {
      try {
        let result = await chrome.storage.local.get([
          "isRunning",
          "elapsedTime",
        ]);
        setElapsedTime(Number(result.elapsedTime));
        setIsRunning(Boolean(result.isRunning));
      } catch (err) {
        console.error(err);
      }
    }
    function effectFunc(changes: any) {
      /*if (Number(result.startTime) != 0) {
          startTimeRef.current = Number(result.startTime);
        }
        console.log(startTimeRef.current);
        setIsRunning(Boolean(result.isRunning));
        console.log(isRunning);
        */
      if (changes["elapsedTime"]) {
        setElapsedTime(changes["elapsedTime"].newValue);
      }
      if (changes["isRunning"]) {
        setIsRunning(changes["isRunning"].newValue);
      }
    }
    loadVal();
    chrome.storage.onChanged.addListener(effectFunc);

    return () => {
      chrome.storage.onChanged.removeListener(effectFunc);
    };
  }, []);

  async function start() {
    try {
      await chrome.storage.local.set({ isRunning: true });
      setIsRunning(true);

      //console.log("This is the start time from tsx " + startTimeRef.current);
      //console.log("startTime set successful from tsx");
    } catch (err) {
      console.error(err);
    }
  }
  async function stop() {
    try {
      await chrome.storage.local.set({ isRunning: false });
      setIsRunning(false);

      //console.log("stopwatch stop successful from tsx");
    } catch (err) {
      console.error(err);
    }
  }
  async function reset() {
    try {
      await chrome.storage.local.set({ resetStop: true });

      //console.log("reset successful tsx");
    } catch (err) {
      console.error(err);
    }
  }

  function formatTime() {
    let hrs = Math.floor(elapsedTime / (1000 * 60 * 60));
    let mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let miliSec = Math.floor((elapsedTime % 1000) / 10);
    if (mins == 0 && hrs == 0) {
      return `${String(seconds).padStart(2, "0")}.${String(miliSec).padStart(2, "0")}`;
    } else if (hrs == 0) {
      return `${mins}:${String(seconds).padStart(2, "0")}.${String(miliSec).padStart(2, "0")}`;
    } else {
      return `${hrs}:${mins}:${String(seconds).padStart(2, "0")}.${String(miliSec).padStart(2, "0")}`;
    }
  }
  async function end() {
    try {
      await chrome.storage.local.set({ end: true });
      //console.log("session ended.");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="stopWatch">
      <div className="timeDisplay">
        {formatTime()
          .split("")
          .map((char, i) => (
            <span key={i} className="time-char">
              {char}
            </span>
          ))}
      </div>
      <div className="controls">
        <button
          className={!isRunning ? "start-button" : "stop-button"}
          onClick={!isRunning ? start : stop}
        >
          {!isRunning ? "start" : "stop"}
        </button>

        <button className="reset-button" onClick={reset}>
          reset
        </button>
        <button className="save-button" onClick={end}>
          save
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
