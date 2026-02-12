import { useState, useEffect } from "react";
import treeImage from "./treeImage";
function Tree() {
  const [streakData, setStreakData] = useState(1);

  useEffect(() => {
    async function load() {
      const result = await chrome.storage.local.get("dailyStreak.curStreak");
      const curStreak = Number(result.dailyStreak) || 1;
      setStreakData(curStreak);
    }
    load();
  }, []);

  function getTreeImage(streakData: number): string {
    const streak = streakData;
    const tree = treeImage(streak);
    return tree;
  }
  function addStreak() {
    setStreakData(streakData + 1);
  }
  function resetStreak() {
    setStreakData(1);
  }
  const tree = getTreeImage(streakData);

  return (
    <div className="tree-container">
      <div className="button-container">
        <button onClick={addStreak}>addStreak</button>
        <button onClick={resetStreak}>resetStreak</button>
      </div>

      <div className="image-container">
        <img className="image" src={tree}></img>
      </div>
    </div>
  );
}

export default Tree;
