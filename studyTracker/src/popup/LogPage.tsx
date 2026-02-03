import type { AppScreen } from "../types/types";
import HomeButton from "../components/HomeButton";
import Table from "../components/Logs/Table";
import GraphButton from "../components/GraphButton";
interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}

function LogPage({ setCurScreen }: Props) {
  return (
    <>
      <HomeButton onClick={() => setCurScreen("home")}></HomeButton>
      <Table></Table>
      <GraphButton onClick={() => setCurScreen("graph")}></GraphButton>
    </>
  );
}

export default LogPage;
