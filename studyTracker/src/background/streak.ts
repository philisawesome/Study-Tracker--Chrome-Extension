
let streak= false;
  type Session = {
    dayKey: string;
    duration: number;
  };
  type Streak ={
    curStreak: number;
    prevDay:string;
  }
async function streakCal() {
  try {
    if (!streak) return;

    const result = await chrome.storage.local.get(["sessions", "dailyStreak"]);
    const sessions = (result.sessions ?? []) as Session[];
    const dailyStreak = (result.dailyStreak ?? {}) as Record<string, Streak>;

    // Get today and yesterday as dayKeys
    const todayKey = getDayKey(0);
    const yesterdayKey = getDayKey(-1);

    // Sum duration for sessions belonging to today OR yesterday
    // This handles the "saved after midnight but session was yesterday" case
    const candidates = [todayKey, yesterdayKey];

    for (const targetDay of candidates) {
      const totalDuration = sessions
        .filter(s => s.dayKey === targetDay)
        .reduce((sum, s) => sum + s.duration, 0);

      if (totalDuration >= 1500000 && !(targetDay in dailyStreak)) {
        // Find the most recent streak entry before targetDay
        const prevDay = getPrevStreakDay(dailyStreak, targetDay);

        dailyStreak[targetDay] = {
          curStreak: prevDay ? dailyStreak[prevDay].curStreak + 1 : 1,
          prevDay: targetDay,
        };

        await chrome.storage.local.set({ dailyStreak, streak: false });
        streak = false;
        return;
      }
    }

    await chrome.storage.local.set({ streak: false });
    streak = false;
  } catch (err) {
    console.error(err);
  }
}
function getDayKey(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Finds the most recent day in dailyStreak that is exactly 1 day before targetDay
function getPrevStreakDay(dailyStreak: Record<string, Streak>, targetDay: string): string | null {
  const target = new Date(targetDay);
  const expectedPrev = new Date(target);
  expectedPrev.setDate(target.getDate() - 1);
  const expectedPrevKey = `${expectedPrev.getFullYear()}-${String(expectedPrev.getMonth() + 1).padStart(2, "0")}-${String(expectedPrev.getDate()).padStart(2, "0")}`;
  return expectedPrevKey in dailyStreak ? expectedPrevKey : null;
}
function storageChange(changes: Record<string, chrome.storage.StorageChange>
){


if (changes["streak"] && typeof changes["streak"].newValue === "boolean") {
        streak= changes["streak"].newValue;

        if(changes["streak"].newValue== true){
            streakCal();
        }

    }
}
  




chrome.storage.onChanged.addListener(storageChange);
