import Home from "./HomePage";
import LogPage from "../popup/LogPage";
import GraphPage from "../popup/GraphPage";
import TreePage from "../popup/TreePage";

import type { AppScreen } from "../types/types";

import { useState } from "react";

function App() {
  const [curScreen, setCurScreen] = useState<AppScreen>("home");
  switch (curScreen) {
    case "home":
      return (
        <div className="home">
          <Home setCurScreen={setCurScreen}></Home>
        </div>
      );
    case "logs":
      return (
        <div className="logs">
          <LogPage setCurScreen={setCurScreen}></LogPage>
        </div>
      );
    case "graph":
      return (
        <div className="graph">
          <GraphPage setCurScreen={setCurScreen}></GraphPage>
        </div>
      );
    case "tree":
      return (
        <div className="tree">
          <TreePage setCurScreen={setCurScreen}></TreePage>
        </div>
      );

    default:
      return (
        <div className="home">
          <Home setCurScreen={setCurScreen}></Home>
        </div>
      );
  }
}

export default App;
