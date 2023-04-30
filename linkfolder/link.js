let url = window.location.href
document.getElementById("Facebook").setAttribute("href", `https://www.facebook.com/dialog/send?link=${url}&redirect_uri=${url}&message=Interesting%20Website&body=I%20found%20an%20interesting%20website%20with%20games%20and%20stuff,%20check%20it%20out!%20`+url);
document.getElementById("Pinterest").setAttribute("href", "https://pinterest.com/pin-builder/?url=github.com/Titanc3/Titanc3.github.io");
document.getElementById("Twitter").setAttribute("href", "https://twitter.com/intent/tweet?text=Interesting%20github%20website%20for%20students,%20"+url);
document.getElementById("Email").setAttribute("href", "mailto:?subject=Interesting%20Website&body=I%20found%20an%20interesting%20website%20with%20games%20and%20stuff,%20check%20it%20out!%20"+url);
