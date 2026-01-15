import type { AppScreen } from "../types/types";
import HomeButton from "../components/HomeButton";

interface Props {
  setCurScreen: React.Dispatch<React.SetStateAction<AppScreen>>;
}

function LogPage({ setCurScreen }: Props) {
  return (
    <>
      <HomeButton onClick={() => setCurScreen("home")}></HomeButton>
    </>
  );
}

export default LogPage;
