import { useState, useEffect } from "react";
import treeImage from "./treeImage";

type dailyStreak = {
  curStreak: number;
};

function getDayKey(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function Tree() {
  const [streakData, setStreakData] = useState(1);

  useEffect(() => {
    async function load() {
      const result = await chrome.storage.local.get("dailyStreak");
      const dailyStreak = result.dailyStreak as
        | Record<string, dailyStreak>
        | undefined;

      const todayKey = getDayKey(0);
      const yesterdayKey = getDayKey(-1);

      const curStreak =
        dailyStreak?.[todayKey]?.curStreak ??
        dailyStreak?.[yesterdayKey]?.curStreak ??
        1;

      console.log(curStreak);
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
        <h2 className="streak-text">{`Current Streak: ${streakData}`}</h2>
      </div>
    </div>
  );
}

export default Tree;
