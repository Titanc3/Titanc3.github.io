function addText1(text) {
  const para = document.createElement("h3");
  para.innerText = text;
  para.style.margin = "0px"
  document.getElementById("schedule").appendChild(para);
}
function addText2(text) {
  const para = document.createElement("h3");
  para.innerText = text;
  para.style.margin = "0px 0px 25px"
  para.style.color = "#666666"
  document.getElementById("schedule").appendChild(para);
}

function short(array, hours, minutes, seconds, one, two, three, four) {
  return (((array[one][two]*60)+array[three][four])*60)-(((hours*60)+minutes)*60+seconds);
}

function timedUpdate() {
  iterations += 1;
  let d = new Date();
  let sec = d.getSeconds();
  let min = d.getMinutes();
  let hr = d.getHours();
  let till = 0;
  for (item of fullList) {
    if ((item[1][0]*60)+item[1][1] > (hr*60)+min) {
      till = item;
      break;
    }
  }
  let nextPeriod = structuredClone(item) //makes sure there isn't any variable intertwining screwery (modern browsers only)
  if (item[0][0] >= 13) {nextPeriod[0][0] -= 12}
  if (item[1][0] >= 13) {nextPeriod[1][0] -= 12}
  let tillEnd = 0;
  let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  if ((fullList[fullList.length-1][1][0]*60)+fullList[fullList.length-1][1][1] > (hr*60)+min) {
    tillEnd = [fullList[0][0],fullList[fullList.length-1][1],fullList[fullList.length-1][2]];
  }
  if (till == 0) { 
    document.getElementById("line1L").innerHTML = "End of"; 
    document.getElementById("line2L").innerHTML = title;
    document.getElementById("line1R").innerHTML = "End of"; 
    document.getElementById("line2R").innerHTML = title;
    document.getElementById("timeOfClass").innerHTML = ""
    document.getElementById("roomOfClass").innerHTML = ""
  }
  else if (short(till, hr, min, sec, 0, 0, 0, 1) == Math.abs(short(till, hr, min, sec, 0, 0, 0, 1))) { //class not started
    let diff = short(till, hr, min, sec, 0, 0, 0, 1)
    Hours1 = Math.floor(diff/60/60)
    Minutes1 = Math.floor(((diff/60/60)-(Math.floor(diff/60/60)))*60)
    Seconds1 = diff-Minutes1*60-Hours1*3600
    Finish1 = "Till "+till[2] //used for title shifting, actually somewhat important
    if (vw <= 686) {document.getElementById("line1L").innerHTML = `${Hours1}:${Minutes1}:${Seconds1}`;}
    else {document.getElementById("line1L").innerHTML = `${Hours1} Hrs ${Minutes1.toString().padStart(2, "0")} Mins ${Seconds1.toString().padStart(2, "0")} Secs  `;}
    document.getElementById("line2L").innerHTML = Finish1
    document.getElementById("timeOfClass").innerHTML = nextPeriod[2]+" starts at "+nextPeriod[0][0]+":"+nextPeriod[0][1]+" "
    document.getElementById("timeOfClass").innerHTML += "and ends at "+nextPeriod[1][0]+":"+String(nextPeriod[1][1]).padStart(2, "0")
    document.getElementById("roomOfClass").innerHTML = `Room: ${room[fullList.indexOf(item)]}`
  }
  else if (short(till, hr, min, sec, 1, 0, 1, 1) == Math.abs(short(till, hr, min, sec, 1, 0, 1, 1))) { //class started
    let diff = short(till, hr, min, sec, 1, 0, 1, 1)
    Hours1 = Math.floor(diff/60/60)
    Minutes1 = Math.floor(((diff/60/60)-(Math.floor(diff/60/60)))*60)
    Seconds1 = diff-Minutes1*60-Hours1*3600
    Finish1 = "Till end of "+till[2] //diff bc title max text amount
    if (vw <= 686) {document.getElementById("line1L").innerHTML = `${Hours1}:${Minutes1.toString().padStart(2, "0")}:${Seconds1.toString().padStart(2, "0")}`;}
    else {document.getElementById("line1L").innerHTML = `${Hours1} Hrs ${Minutes1} Mins ${Seconds1} Secs  `;}
    document.getElementById("line2L").innerHTML = "Till "+till[2]+" ends"
    document.getElementById("timeOfClass").innerHTML = nextPeriod[2]+" ends at "+nextPeriod[1][0]+":"+String(nextPeriod[1][1]).padStart(2, "0")
    document.getElementById("roomOfClass").innerHTML = `Room: ${room[fullList.indexOf(item)]}`
  }
  if (tillEnd == 0) {}
    else if (short(tillEnd, hr, min, sec, 0, 0, 0, 1) == Math.abs(short(tillEnd, hr, min, sec, 0, 0, 0, 1))) { //school not started
    let diff = short(tillEnd, hr, min, sec, 0, 0, 0, 1)
    Hours2 = Math.floor(diff/60/60)
    Minutes2 = Math.floor(((diff/60/60)-(Math.floor(diff/60/60)))*60)
    Seconds2 = diff-Minutes2*60-Hours2*3600
    Finish2 = "Till "+title
    if (vw <= 686) {document.getElementById("line1R").innerHTML = `${Hours2}:${Minutes2.toString().padStart(2, "0")}:${Seconds2.toString().padStart(2, "0")}`;}
    else {document.getElementById("line1R").innerHTML = `${Hours2} Hrs ${Minutes2} Mins ${Seconds2} Secs  `;}
    document.getElementById("line2R").innerHTML = "Till "+title
  }
  else if (short(tillEnd, hr, min, sec, 1, 0, 1, 1) == Math.abs(short(tillEnd, hr, min, sec, 1, 0, 1, 1))) { //school started
    let diff = short(tillEnd, hr, min, sec, 1, 0, 1, 1)
    Hours2 = Math.floor(diff/60/60)
    Minutes2 = Math.floor(((diff/60/60)-(Math.floor(diff/60/60)))*60)
    Seconds2 = diff-Minutes2*60-Hours2*3600
    Finish2 = "Till end of "+title
    if (vw <= 686) {document.getElementById("line1R").innerHTML = `${Hours2}:${Minutes2.toString().padStart(2, "0")}:${Seconds2.toString().padStart(2, "0")}`;}
    else {document.getElementById("line1R").innerHTML = `${Hours2} Hrs ${Minutes2} Mins ${Seconds2} Secs  `;}
    document.getElementById("line2R").innerHTML = "Till "+title+" ends"
  }
  document.getElementById("schedule").innerHTML = ""
  if (document.querySelector('.time:checked') != null) {
    for (const miniList of fullList) { // displaying info loop
      let a = miniList[0][1].toString().padStart(2, "0");
      let b = miniList[1][1].toString().padStart(2, "0");
      
      if (miniList[0][0] >= 12) {
        if (miniList[0][0] == 12) {newHour = `${miniList[0][0]} PM`.split(" ")}
        else {newHour = `${miniList[0][0]-12} PM`.split(" ")}
      }
        
      else {
        if (miniList[0][0] == 0) {newHour = `12 AM`.split(" ") }
        else {newHour = `${miniList[0][0]} AM`.split(" ") }
      }
      
      if (miniList[1][0] >= 12) {
        if (miniList[1][0] == 12) {newHour2 = `${miniList[1][0]} PM`.split(" ")}
        else {newHour2 = `${miniList[1][0]-12} PM`.split(" ")}
      }
        
      else { 
        if (miniList[1][0] == 0) {newHour2 = `${miniList[1][0]} AM`.split(" ")}
        else {newHour2 = `${miniList[1][0]} AM`.split(" ")}
      }
      addText1(miniList[2])
      if (typeof room[fullList.indexOf(miniList)] == "undefined") {addText2(`${newHour[0]}:${a} ${newHour[1]} - ${newHour2[0]}:${b} ${newHour2[1]}`)}
      else {addText2(`${newHour[0]}:${a} ${newHour[1]} - ${newHour2[0]}:${b} ${newHour2[1]}\nRoom: ${room[fullList.indexOf(miniList)]}`)}
  
    }
  }
  else {
    
    for (const miniList of fullList) { // displaying info loop
    let a = miniList[0][1].toString().padStart(2, "0");
    let b = miniList[1][1].toString().padStart(2, "0");
    addText1(miniList[2])
    if (typeof room[fullList.indexOf(miniList)] == "undefined") {addText2(`${miniList[0][0]}:${a} - ${miniList[1][0]}:${b}`)}
    else {addText2(`${miniList[0][0]}:${a} - ${miniList[1][0]}:${b}\nRoom: ${room[fullList.indexOf(miniList)]}`)}
    }
  }
  if (document.getElementById("roomOfClass").innerHTML == "Room: undefined") {document.getElementById("roomOfClass").innerHTML = ""}
if (typeof Hours1 == "undefined" || parseInt(Hours1+Hours2+Minutes1+Minutes2) == 0 && parseInt(Seconds1)+parseInt(Seconds2) == 2) {}
else {
Hours1 = Hours1.toString().padStart(2, "0");
Minutes1 = Minutes1.toString().padStart(2, "0");
Seconds1 = Seconds1.toString().padStart(2, "0");
Hours2 = Hours2.toString().padStart(2, "0");
Minutes2 = Minutes2.toString().padStart(2, "0");
Seconds2 = Seconds2.toString().padStart(2, "0");
}
if (typeof Hours1 == "undefined" || parseInt(Hours1+Hours2+Minutes1+Minutes2) == 0 && parseInt(Seconds1)+parseInt(Seconds2) == 2) {
  document.getElementById("title").innerHTML = `End of ${title}`
}
else if (iterations <= 30) {
  document.getElementById("title").innerHTML = `Titanc3's Time`
}
else if (iterations <= 70) {
  document.getElementById("title").innerHTML = `${Hours1}:${Minutes1}:${Seconds1} ${Finish1}`
}
else if (iterations <= 110) {
  document.getElementById("title").innerHTML = `${Hours2}:${Minutes2}:${Seconds2} ${Finish2}`
}
else {
  iterations = 0
}
}

function decrypt(index, index2) { return symbols.indexOf(timesInMinutes[index][index2]); }

iterations = 0;
const fullList = [];

if (m != null && names != null && title != null) {
  timesInMinutes = m.split("|"); // query variables
  names = names.split("|");

  for (let i = 0; i < timesInMinutes.length; i+=2) {
  
    fullList.push([[decrypt(i, 0), decrypt(i, 1)], [decrypt(i+1, 0), decrypt(i+1, 1)], names[i/2]]); //xtra rip reading code, format: [[hr, min](start), [hr, min](stop), name]
  }

// url example:   titanc3.github.io/period?m=∆≣|⊏⊐|⊙⊚|⊛⊞|⊟⊠|⊟⊛&names=poop|zoop|sloop&title=scholo

  console.log("Hey! No snooping!");
  console.log(room)
  setInterval(timedUpdate, 125);
}
