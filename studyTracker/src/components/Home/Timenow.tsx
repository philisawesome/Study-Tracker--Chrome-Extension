import { useState, useEffect, useRef } from "react";

function Timenow() {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  const intervalIdRef = useRef<number | undefined>(undefined);

  const [curTime, setCurTime] = useState(currentTime);
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      let newTime = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      setCurTime(newTime);
    }, 1000);
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);
  let time = `The time is ${curTime}`;
  return (
    <div className="timeDiv">
      <h2 className="timeText">{time}</h2>
    </div>
  );
}

export default Timenow;
