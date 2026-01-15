
let isRunning = false; 
let elapsedTime = 0; 
let startTime = 0
let resetStop = false;
let timerId: ReturnType<typeof setInterval> | undefined;
let end = false;
function ticking(startTime: number){
    if(isRunning){
        if(!timerId){
        timerId= setInterval(()=>{
        elapsedTime= Date.now() - startTime; 
        chrome.storage.local.set({elapsedTime});
        }, 10);

    }




}
}
function stopTicking(){
    if(timerId){
        clearInterval(timerId);
        timerId= undefined;
        console.log("interval is cleared ");
    }
}




async function start(){
    try{
    isRunning=true;
    let result= await chrome.storage.local.get( "elapsedTime");
    elapsedTime = Number(result.elapsedTime) || 0;
    if(elapsedTime==0){
        startTime= Date.now();
    }
    else{
        startTime= Date.now()-elapsedTime;
    }
    
    ticking(startTime);

    

    
    console.log("hi from start bg");
    //stopWatch();

}catch(err){
    console.error(err);
}
}

/*
async function stopWatch(){
    const result = await chrome.storage.local.get(["startTime", "isRunning"]);
    startTime= Number(result.startTime);
    isRunning=Boolean(result.isRunning);
    if(isRunning== true){
        if (startTime== 0){
            elapsedTime=0;
        }
        else{
        elapsedTime= Date.now() - Number(startTime);
        }
    }
    chrome.storage.local.set({
        elapsedTime
    },()=>{
        console.log("elapsed time saved bg");
    })
}
    */


function pause(){
    stopTicking();

}

async function reset(){
    try{
        isRunning =false; 
        elapsedTime= 0; 
        resetStop= false;
        startTime= 0;
        end=false

        await chrome.storage.local.set({ isRunning });
        await chrome.storage.local.set({ elapsedTime});   
        await chrome.storage.local.set({ resetStop});
        await chrome.storage.local.set({startTime});
        await chrome.storage.local.set({end});

        stopTicking();
        console.log("reset succefull bg ");
    }
    catch(err){
        console.error(err);
    }
}
async function endFunc(){
    try{
        if(end){
            const result = await chrome.storage.local.get(["elapsedTime", "sessions"]);
            const sessions = (result.sessions ?? []) as any[];
            const duration = Number(result.elapsedTime) || 0; 
            const startDate= Date.now() - duration 
            const dayKey = new Date(startDate).toLocaleDateString().split('T')[0];

            if (duration > 30000){
                sessions.push({dayKey, duration });

            }

        await chrome.storage.local.set({ sessions });
        console.log(JSON.stringify(sessions, null, 2));
        reset();
        }
    }catch(err){
    console.error(err);
    }
}

function storageChange(changes:any){
  //const changedItems = Object.keys(changes);

  /*for (const item of changedItems) {
    console.log(`${item} has changed:`);
    console.log("Old value: ", changes[item].oldValue);
    console.log("New value: ", changes[item].newValue);
  */
    if(changes["isRunning"]){
        isRunning= changes["isRunning"].newValue;

        if(changes["isRunning"].newValue== true){
            start();
        }
        else{
            pause();
        }
    }
    
    
    if(changes["resetStop"]){
        console.log("im in reset bg");
        resetStop = changes["resetStop"].newValue;
        if(changes["resetStop"].newValue == true){
            reset();
        }

    }
        
    if(changes["end"]){
        
        end = changes["end"].newValue;
        if(changes["end"].newValue == true){
            endFunc();
        }

    }




 
}
chrome.storage.onChanged.addListener(storageChange);

