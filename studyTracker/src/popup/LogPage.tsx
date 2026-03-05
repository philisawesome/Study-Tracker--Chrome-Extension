import type { AppScreen } from "../types/types";
import HomeButton from "../components/HomeButton";
import Table from "../components/Logs/Table";
import GraphButton from "../components/GraphButton";
import "../styles/LogPage.css";

interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}

function LogPage({ setCurScreen }: Props) {
  return (
    <div className="log-page">
      <div className="top-buttons">
        <HomeButton onClick={() => setCurScreen("home")}></HomeButton>
        <GraphButton onClick={() => setCurScreen("graph")}></GraphButton>
      </div>
      <Table></Table>
    </div>
  );
}

export default LogPage;
