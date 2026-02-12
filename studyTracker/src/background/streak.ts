
let streak= false;
  type Session = {
    dayKey: string;
    duration: number;
  };
  type Streak ={
    curStreak: number;
    prevDay:string;
  }
async function streakCal(){
  try{
  const dayArray: string[]=[];
    for (let i = 0; i < 2; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const curDay = `${year}-${month}-${day}`;
      dayArray.push(curDay);
    }

  if(streak){
    const result = await chrome.storage.local.get(["sessions", "dailyStreak"]);
    const sessions = (result.sessions ?? []) as Session[];
    const dailyStreak: Record<string,Streak> =(result.dailyStreak ?? {}) as Record<string,Streak>; 
  

    const totalDuration = sessions
    .filter(s=>s.dayKey===dayArray[0])
    .reduce((sum,s)=> sum+ s.duration,0);

    
    if(totalDuration > 45000){
      const curDay:string= dayArray[0];
      const prevDay:string = dayArray[1];
      if(!(curDay in dailyStreak )){
        if(prevDay in dailyStreak){
          dailyStreak[curDay] = {
            curStreak: dailyStreak[prevDay].curStreak+1, 
            prevDay:curDay
          }
        
            }
            else{
            dailyStreak[curDay]={
              curStreak: 1,
              prevDay:curDay  
          }
        }
      }
      else{
        return;
      }
      await chrome.storage.local.set({dailyStreak,streak:false});
      streak=false
      
    }
  }
  }catch(err){
    console.error(err);
  }




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
