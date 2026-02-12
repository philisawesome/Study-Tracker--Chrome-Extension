import type { AppScreen } from "../types/types";
import HomeButton from "../components/HomeButton";
import Log from "../components/Home/LogButton";
import Tree from "../components/Tree/Tree";
import "../styles/TreePage.css";

//import TreeButton from "../components/TreeButton";
interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}

function TreePage({ setCurScreen }: Props) {
  return (
    <div className="main-container">
      <div className="button-container">
        <HomeButton onClick={() => setCurScreen("home")}></HomeButton>
        <Log onClick={() => setCurScreen("logs")}></Log>
      </div>
      <Tree></Tree>
    </div>
  );
}

export default TreePage;
