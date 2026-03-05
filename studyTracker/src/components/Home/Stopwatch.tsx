import { useState, useEffect } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

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
    } catch (err) {
      console.error(err);
    }
  }
  async function stop() {
    try {
      await chrome.storage.local.set({ isRunning: false });
      setIsRunning(false);
    } catch (err) {
      console.error(err);
    }
  }
  async function reset() {
    try {
      await chrome.storage.local.set({ resetStop: true });
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
      return `${String(mins).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(miliSec).padStart(2, "0")}`;
    } else {
      return `${hrs}:${String(mins).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(miliSec).padStart(2, "0")}`;
    }
  }
  async function end() {
    try {
      await chrome.storage.local.set({ end: true });
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
          {!isRunning ? "START" : "STOP"}
        </button>

        <button className="reset-button" onClick={reset}>
          RESET
        </button>
        <button className="save-button" onClick={end}>
          SAVE
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
