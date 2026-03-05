
function treeImage(streak:number):string{
  let imageMap = new Map<number,string>([
    [1,"/treePngs/tree_day_1.png"],
    [2,"/treePngs/tree_day_2.png"],
    [3,"/treePngs/tree_day_3.png"],
    [4,"/treePngs/tree_day_4.png"],
    [5,"/treePngs/tree_day_5.png"],
    [6,"/treePngs/tree_day_6.png"],
    [7,"/treePngs/tree_day_7.png"],
    [8,"/treePngs/tree_day_8.png"],
    [9,"/treePngs/tree_day_9.png"],
    [10,"/treePngs/tree_day_10.png"],



  ]);

  return streak >=10?"/treePngs/tree_day_10.png": imageMap.get(streak) || "/treePngs/tree_day_1.png";
  


}

export default treeImage;