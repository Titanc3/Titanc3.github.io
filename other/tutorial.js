function ReadCookie(cookieKey) { 
   var allcookies = document.cookie.split("; ") 
   // split str into list str="key=value; key=value; ..." list="key=value", "key=value", ... 
 
   for (let i = 0; i < allcookies.length; i++) { 
      let pair = allcookies[i].split("="); 
      if (pair[0] == cookieKey) { 
        return pair[1]; //pair[0] = key | pair[1] = value 
      } 
   } 
  return null 
} 
function tutorialCookie(message, urlPath) { 
  let d = new Date;
  
  if (ReadCookie("tutorial") == "finished") { document.cookie = `tutorial=finished; expires=Thu, 26 Jan ${d.getFullYear()+1} 12:00:00 UTC; path=/`; } 
   
  else if ("https://titanc3.github.io"+ReadCookie("tutorial") == window.location.href) { 
    alert(`${message}`); 
    document.getElementById("tutorialNextLink").style.border = "2px solid yellow"; 
    document.cookie = `tutorial=${urlPath}; expires=Thu, 26 Jan ${d.getFullYear()+1} 12:00:00 UTC; path=/`; 
  } 
  else {
    if (confirm("Can you finish the tutorial before browsing around?") == true) { window.location.href="https://titanc3.github.io"+ReadCookie("tutorial"); }
    else { document.cookie = `tutorial=finished; expires=Thu, 26 Jan ${d.getFullYear()+1} 12:00:00 UTC; path=/`; }
  }
};
