import Stopwatch from "../components/Home/Stopwatch";
import Timenow from "../components/Home/Timenow";
import Log from "../components/Home/LogButton";
import GraphButton from "../components/GraphButton";

import type { AppScreen } from "../types/types";

interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}
function Home({ setCurScreen }: Props) {
  return (
    <>
      <Stopwatch></Stopwatch>
      <div className="button-container">
        {" "}
        <Log onClick={() => setCurScreen("logs")}></Log>
        <GraphButton onClick={() => setCurScreen("graph")}></GraphButton>
      </div>

      <Timenow></Timenow>
    </>
  );
}

export default Home;
