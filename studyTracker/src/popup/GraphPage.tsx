import type { AppScreen } from "../types/types";
import HomeButton from "../components/HomeButton";
import Log from "../components/Home/LogButton";
import Graph from "../components/Graph/Graph";

interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}

function GraphPage({ setCurScreen }: Props) {
  return (
    <>
      <div className="button-container">
        <HomeButton onClick={() => setCurScreen("home")}></HomeButton>
        <Log onClick={() => setCurScreen("logs")}></Log>
      </div>
      <Graph></Graph>
    </>
  );
}

export default GraphPage;
