
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
    if(elapsedTime===0){
        startTime= Date.now();
        chrome.storage.local.set({startTime,
            sessStart: new Date().toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit"
            })
        })

    }
    else{
        startTime= Date.now()-elapsedTime;

    }
    
    ticking(startTime);

    

    
    //console.log("hi from start bg");
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
        //console.log("reset succefull bg ");
    }
    catch(err){
        console.error(err);
    }
}
async function endFunc(){
    try{
        if(end){
            const result = await chrome.storage.local.get(["elapsedTime", "sessions","startTime", "sessStart"]);
            const sessions = (result.sessions ?? []) as any[];
            const duration = Number(result.elapsedTime) || 0; 
            const startDate= Number(result.startTime) || 0;
            const sessStart= String(result.sessStart) || '';
            const d = new Date(startDate); 
            const year= d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");
            const dayKey = `${year}-${month}-${day}`;

            //console.log("sessStart from storage:" + result.sessStart);
            //console.log("startTime from storage:", result.startTime);

            if (duration > 30000){
                sessions.push({dayKey, duration, sessStart});

            }


        await chrome.storage.local.set({ sessions , streak:true});
        //console.log(JSON.stringify(sessions, null, 2));
        reset();
        }
    }catch(err){
    console.error(err);
    }
}

function storageChange(changes: Record<string,chrome.storage.StorageChange>){
  //const changedItems = Object.keys(changes);

  /*for (const item of changedItems) {
    console.log(`${item} has changed:`);
    console.log("Old value: ", changes[item].oldValue);
    console.log("New value: ", changes[item].newValue);
  */
    if(changes["isRunning"] && typeof changes["isRunning"].newValue=== "boolean"){
        isRunning= changes["isRunning"].newValue;

        if(changes["isRunning"].newValue== true){
            start();
        }
        else{
            pause();
        }
    }
    
    
    if(changes["resetStop"] && typeof changes["resetStop"].newValue === "boolean"){
        console.log("im in reset bg");
        resetStop = changes["resetStop"].newValue;
        if(changes["resetStop"].newValue == true){
            reset();
        }

    }
        
    if(changes["end"] && typeof changes["end"].newValue === "boolean"){
        
        end = changes["end"].newValue;
        if(changes["end"].newValue == true){
            endFunc();
        }

    }




 
}
chrome.storage.onChanged.addListener(storageChange);

