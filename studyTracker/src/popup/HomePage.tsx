import Stopwatch from "../components/Home/Stopwatch";
import Timenow from "../components/Home/Timenow";
import Log from "../components/Home/LogButton";
import GraphButton from "../components/GraphButton";
import TreeButton from "../components/TreeButton";
import type { AppScreen } from "../types/types";
import "../styles/HomePage.css";

interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}
function Home({ setCurScreen }: Props) {
  return (
    <div className="home-page">
      <img className="title" src="/images/title4.png"></img>
      <Stopwatch></Stopwatch>
      <div className="top-container">
        {" "}
        <Log onClick={() => setCurScreen("logs")}></Log>
        <GraphButton onClick={() => setCurScreen("graph")}></GraphButton>
        <TreeButton onClick={() => setCurScreen("tree")}></TreeButton>
      </div>

      <Timenow></Timenow>
    </div>
  );
}

export default Home;
