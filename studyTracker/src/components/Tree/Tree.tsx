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
    if (streak === 11) {
      alert("Tree is fully grown, more to come!");
    }
    return tree;
  }

  const tree = getTreeImage(streakData);

  return (
    <div className="tree-container">
      <div className="image-container">
        <img className="image" src={tree}></img>
      </div>
      <div className="text-container">
        <h2 className="streak-text"> {`Current Streak: ${streakData}`}</h2>
      </div>
    </div>
  );
}

export default Tree;
