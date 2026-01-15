import Stopwatch from "../components/Home/Stopwatch";
import Timenow from "../components/Home/Timenow";
import Log from "../components/Home/LogButton";
import type { AppScreen } from "../types/types";

interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}
function Home({ setCurScreen }: Props) {
  return (
    <>
      <Stopwatch></Stopwatch>
      <Timenow></Timenow>
      <Log onClick={() => setCurScreen("logs")}></Log>
    </>
  );
}

export default Home;
